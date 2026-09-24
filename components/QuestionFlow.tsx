"use client";

import { useMemo, useState } from "react";
import type { AnswerMap, PredictionMap, Question } from "@/lib/types";

interface Step {
  type: "answer" | "predict";
  question: Question;
}

interface QuestionFlowProps {
  questions: Question[];
  nickname: string;
  onComplete: (answers: AnswerMap, predictions: PredictionMap) => void;
}

export function QuestionFlow({
  questions,
  nickname,
  onComplete,
}: QuestionFlowProps) {
  const steps = useMemo<Step[]>(() => {
    const list: Step[] = [];
    for (const question of questions) {
      list.push({ type: "answer", question });
      if (question.isPrediction) {
        list.push({ type: "predict", question });
      }
    }
    return list;
  }, [questions]);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [predictions, setPredictions] = useState<PredictionMap>({});

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function choose(optionIndex: number) {
    if (step.type === "answer") {
      setAnswers((prev) => ({ ...prev, [step.question.id]: optionIndex }));
    } else {
      setPredictions((prev) => ({
        ...prev,
        [step.question.id]: optionIndex,
      }));
    }

    if (isLast) {
      const finalAnswers =
        step.type === "answer"
          ? { ...answers, [step.question.id]: optionIndex }
          : answers;
      const finalPredictions =
        step.type === "predict"
          ? { ...predictions, [step.question.id]: optionIndex }
          : predictions;
      onComplete(finalAnswers, finalPredictions);
      return;
    }

    setStepIndex((i) => i + 1);
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  const currentValue =
    step.type === "answer"
      ? answers[step.question.id]
      : predictions[step.question.id];

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <div className="mb-2 flex justify-between text-xs font-semibold text-foreground/60">
          <span>
            {stepIndex + 1} / {steps.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="paper-card flex flex-1 flex-col gap-5 rounded-2xl p-5">
        <span className="sticker -rotate-2 self-start bg-accent-lavender px-3 py-1 text-xs font-bold text-brand-dark uppercase">
          {step.question.topic}
        </span>
        <h2 className="font-display text-2xl leading-snug text-foreground">
          {step.type === "predict"
            ? `${nickname}의 친구라면, "${step.question.text}"`
            : step.question.text}
        </h2>
        {step.type === "predict" && (
          <p className="-mt-3 text-sm text-foreground/60">
            🔮 내 친구는 이렇게 답할 것 같아요
          </p>
        )}

        <div className="flex flex-col gap-3">
          {step.question.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => choose(index)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                currentValue === index
                  ? "border-brand bg-brand/10 shadow-[3px_3px_0_var(--brand)]"
                  : "border-black/10 bg-white hover:border-brand/50 hover:-translate-y-0.5"
              }`}
            >
              {currentValue === index ? "✅ " : ""}
              {option}
            </button>
          ))}
        </div>
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={goBack}
          className="self-start text-sm font-semibold text-foreground/50 underline"
        >
          이전 질문
        </button>
      )}
    </div>
  );
}
