"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NicknameForm } from "@/components/NicknameForm";
import { PackPicker } from "@/components/PackPicker";
import { QuestionFlow } from "@/components/QuestionFlow";
import { getPackById } from "@/data/questionPacks";
import { createSession } from "@/lib/store";
import type { AnswerMap, PredictionMap } from "@/lib/types";

export default function StartPage() {
  const router = useRouter();
  const [packId, setPackId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleComplete(answers: AnswerMap, predictions: PredictionMap) {
    if (!nickname || !packId) return;
    setSubmitting(true);
    setError(null);
    try {
      const session = await createSession(nickname, answers, predictions, packId);
      router.push(`/s/${session.id}`);
    } catch {
      setError("테스트를 만드는 중 문제가 발생했어요. 다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  if (submitting) {
    return (
      <div className="paper-card flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl p-8 text-center">
        <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-brand/20 border-t-brand" />
        <p className="text-sm font-semibold text-foreground/70">
          테스트를 만드는 중...
        </p>
      </div>
    );
  }

  if (!packId) {
    return <PackPicker onSelect={setPackId} />;
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
    <div className="flex flex-1 flex-col gap-3">
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}
      <QuestionFlow
        questions={getPackById(packId).questions}
        nickname={nickname}
        onComplete={handleComplete}
      />
    </div>
  );
}
