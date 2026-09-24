import { QUESTIONS } from "@/data/questions";
import { pickResultTag } from "@/data/resultTags";
import type {
  JjinchinResult,
  Participant,
  PerQuestionBreakdown,
} from "@/lib/types";

const MATCH_WEIGHT = 0.4;
const UNDERSTAND_WEIGHT = 0.6;

export function computeResult(
  a: Participant,
  b: Participant,
): JjinchinResult {
  const breakdown: PerQuestionBreakdown[] = [];
  let matchCount = 0;
  let predictionTotal = 0;
  let predictionCorrect = 0;

  let worstPredictionId: string | null = null;
  let worstPredictionScore = -1; // 둘 다 틀렸을 때 우선순위를 매기기 위한 값

  let bestMatchId: string | null = null;

  for (const question of QUESTIONS) {
    const aAnswer = a.answers[question.id];
    const bAnswer = b.answers[question.id];
    if (aAnswer === undefined || bAnswer === undefined) continue;

    const matched = aAnswer === bAnswer;
    if (matched) {
      matchCount += 1;
      if (bestMatchId === null) bestMatchId = question.id;
    }

    const row: PerQuestionBreakdown = {
      question,
      aAnswer,
      bAnswer,
      matched,
    };

    if (question.isPrediction) {
      const aPredictedB = a.predictions[question.id];
      const bPredictedA = b.predictions[question.id];

      if (aPredictedB !== undefined) {
        predictionTotal += 1;
        const correct = aPredictedB === bAnswer;
        row.aPredictedB = aPredictedB;
        row.aPredictedCorrectly = correct;
        if (correct) predictionCorrect += 1;
        else if (worstPredictionScore < 1) {
          worstPredictionScore = 1;
          worstPredictionId = question.id;
        }
      }

      if (bPredictedA !== undefined) {
        predictionTotal += 1;
        const correct = bPredictedA === aAnswer;
        row.bPredictedA = bPredictedA;
        row.bPredictedCorrectly = correct;
        if (correct) predictionCorrect += 1;
        else if (worstPredictionScore < 2) {
          worstPredictionScore = 2;
          worstPredictionId = question.id;
        }
      }
    }

    breakdown.push(row);
  }

  const answeredCount = breakdown.length || 1;
  const matchRate = matchCount / answeredCount;
  const understandRate =
    predictionTotal > 0 ? predictionCorrect / predictionTotal : matchRate;

  const score = Math.round(
    (matchRate * MATCH_WEIGHT + understandRate * UNDERSTAND_WEIGHT) * 100,
  );

  const tag = pickResultTag(score, matchRate, understandRate);

  return {
    matchRate,
    understandRate,
    score,
    breakdown,
    bestMatchQuestionId: bestMatchId,
    worstPredictionQuestionId: worstPredictionId,
    tag,
  };
}
