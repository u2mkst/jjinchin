"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "두 사람의 답변을 비교하는 중...",
  "서로에 대한 예측을 채점하는 중...",
  "찐친력 점수를 계산하는 중...",
  "관계 별명을 고르는 중...",
];

export function LoadingAnalysis() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="paper-card flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl p-8 text-center">
      <div className="h-14 w-14 animate-spin-slow rounded-full border-4 border-brand/20 border-t-brand" />
      <p className="text-lg font-bold">분석 중...</p>
      <p className="text-sm text-foreground/60">{MESSAGES[messageIndex]}</p>
    </div>
  );
}
