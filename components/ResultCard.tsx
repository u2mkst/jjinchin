"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { JjinchinResult, Participant } from "@/lib/types";

interface ResultCardProps {
  a: Participant;
  b: Participant;
  result: JjinchinResult;
}

export function ResultCard({ a, b, result }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const bestQuestion = result.breakdown.find(
    (row) => row.question.id === result.bestMatchQuestionId,
  );
  const worstQuestion = result.breakdown.find(
    (row) => row.question.id === result.worstPredictionQuestionId,
  );

  async function handleDownload() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#fffdf8",
      });
      const link = document.createElement("a");
      link.download = `찐친력_${a.nickname}_${b.nickname}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // 캡처 실패 시 사용자에게 스크린샷을 권장
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className="paper-card flex aspect-[9/16] w-full max-w-xs flex-col justify-between rounded-2xl p-6"
        style={{ background: "#fffdf8" }}
      >
        <span className="tape" />
        <div>
          <p className="text-xs font-bold tracking-widest text-brand uppercase">
            ✨ 찐친력 성적표 ✨
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground/60">
            {a.nickname} × {b.nickname}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="animate-score-in font-display text-7xl text-brand">
            {result.score}
            <span className="text-3xl">점</span>
          </span>
          <span className="sticker -rotate-2 bg-accent px-3 py-1 text-xs font-bold text-brand-dark">
            {result.tag.grade}등급
          </span>
          <h3 className="mt-2 font-display text-2xl text-foreground">
            {result.tag.title}
          </h3>
          <p className="text-sm text-foreground/70">{result.tag.line}</p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-foreground/60">
          <div className="flex justify-between border-t border-black/10 pt-2">
            <span>성향 일치율</span>
            <span className="font-semibold">
              {Math.round(result.matchRate * 100)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>서로 이해도</span>
            <span className="font-semibold">
              {Math.round(result.understandRate * 100)}%
            </span>
          </div>
          {bestQuestion && (
            <p className="mt-1">
              ✅ 찰떡: {bestQuestion.question.topic}
            </p>
          )}
          {worstQuestion && (
            <p>❌ 착각 포인트: {worstQuestion.question.topic}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={saving}
        className="w-full max-w-xs rounded-xl bg-brand-dark px-4 py-3 text-sm font-bold text-white transition-transform hover:-rotate-1 active:scale-95 active:rotate-0 disabled:opacity-50"
      >
        {saving ? "저장 중..." : "📸 카드 이미지 저장"}
      </button>
    </div>
  );
}
