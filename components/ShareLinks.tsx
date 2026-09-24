"use client";

import { useState } from "react";

interface ShareLinksProps {
  url: string;
  text: string;
  title?: string;
}

export function ShareLinks({ url, text, title = "찐친력" }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근 불가 환경 (권한 등) — 조용히 무시
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // 사용자가 공유를 취소한 경우 — 무시
      }
    } else {
      handleCopy();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="rounded-xl bg-brand px-4 py-3 text-base font-bold text-white transition-transform hover:-rotate-1 active:scale-95 active:rotate-0"
      >
        친구에게 초대 링크 보내기 💌
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-sm font-semibold transition-colors active:scale-95"
      >
        {copied ? "링크가 복사됐어요!" : "링크 복사"}
      </button>
    </div>
  );
}
