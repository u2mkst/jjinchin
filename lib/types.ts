export type Role = "A" | "B";

export interface Question {
  id: string;
  topic: string;
  text: string;
  options: [string, string, string, string];
  /** B형: 상대의 답을 예측하는 질문도 함께 받는다 */
  isPrediction: boolean;
}

/** questionId -> 선택한 보기 인덱스(0~3) */
export type AnswerMap = Record<string, number>;
/** questionId -> "내 친구라면?" 예측 인덱스 (isPrediction 질문만) */
export type PredictionMap = Record<string, number>;

export interface Participant {
  id: string;
  sessionId: string;
  role: Role;
  nickname: string;
  answers: AnswerMap;
  predictions: PredictionMap;
  submittedAt: string | null;
}

export interface Session {
  id: string;
  createdAt: string;
  expiresAt: string;
  participantA: Participant | null;
  participantB: Participant | null;
}

export interface PerQuestionBreakdown {
  question: Question;
  aAnswer: number;
  bAnswer: number;
  matched: boolean;
  /** 예측 문항일 때만 존재 */
  aPredictedB?: number;
  bPredictedA?: number;
  aPredictedCorrectly?: boolean;
  bPredictedCorrectly?: boolean;
}

export interface JjinchinResult {
  matchRate: number; // 0~1, 성향 일치율
  understandRate: number; // 0~1, 서로 이해도
  score: number; // 0~100, 찐친력 점수
  breakdown: PerQuestionBreakdown[];
  bestMatchQuestionId: string | null;
  worstPredictionQuestionId: string | null; // 착각 포인트
  tag: {
    title: string;
    line: string;
    grade: string;
  };
}
