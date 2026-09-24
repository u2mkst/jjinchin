"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NicknameForm } from "@/components/NicknameForm";
import { QuestionFlow } from "@/components/QuestionFlow";
import { QUESTIONS } from "@/data/questions";
import { createSession } from "@/lib/store";
import type { AnswerMap, PredictionMap } from "@/lib/types";

export default function StartPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  function handleComplete(answers: AnswerMap, predictions: PredictionMap) {
    if (!nickname) return;
    const session = createSession(nickname, answers, predictions);
    router.push(`/s/${session.id}`);
  }

  if (!nickname) {
    return (
      <NicknameForm
        title="닉네임을 알려주세요"
        description="회원가입 없이 이 테스트 동안만 사용돼요."
        submitLabel="질문 시작하기"
        onSubmit={setNickname}
      />
    );
  }

  return (
    <QuestionFlow
      questions={QUESTIONS}
      nickname={nickname}
      onComplete={handleComplete}
    />
  );
}
