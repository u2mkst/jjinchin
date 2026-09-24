"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { getSoloInsight } from "@/data/soloInsights";
import type { AnswerMap } from "@/lib/types";

interface SoloCardProps {
  nickname: string;
  packId: string;
  answers: AnswerMap;
}

export function SoloCard({ nickname, packId, answers }: SoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const insight = getSoloInsight(packId, answers);

  async function handleDownload() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#fffdf8",
      });
      const link = document.createElement("a");
      link.download = `찐친력_나의성향_${nickname}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // 캡처 실패 시 사용자에게 스크린샷을 권장
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={cardRef}
        className="paper-card relative flex w-full flex-col items-center gap-2 rounded-2xl p-6 text-center"
        style={{ background: "#fffdf8" }}
      >
        <span className="tape tape-r" />
        <p className="text-xs font-bold tracking-widest text-brand uppercase">
          {nickname}님의 미리보는 성향
        </p>
        <p className="mt-1 text-5xl">{insight.emoji}</p>
        <h3 className="font-display text-2xl text-brand">{insight.title}</h3>
        <p className="text-sm text-foreground/70">{insight.line}</p>
        <p className="mt-1 text-[11px] text-foreground/40">
          친구가 참여하면 찐친력 점수까지 더 볼 수 있어요
        </p>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={saving}
        className="w-full rounded-xl border-2 border-brand-dark bg-white px-4 py-3 text-sm font-bold transition-transform hover:rotate-1 active:scale-95 active:rotate-0 disabled:opacity-50"
      >
        {saving ? "저장 중..." : "📸 이 카드만 먼저 저장하기"}
      </button>
    </div>
  );
}
