"use client";

import { useState } from "react";

interface NicknameFormProps {
  title: string;
  description?: string;
  submitLabel?: string;
  onSubmit: (nickname: string) => void;
}

const BANNED_WORDS = ["시발", "씨발", "병신", "fuck", "shit"];

function sanitizeNickname(raw: string): string | null {
  const trimmed = raw.trim().slice(0, 10);
  if (trimmed.length === 0) return null;
  const lower = trimmed.toLowerCase();
  if (BANNED_WORDS.some((word) => lower.includes(word))) return null;
  return trimmed;
}

export function NicknameForm({
  title,
  description,
  submitLabel = "시작하기",
  onSubmit,
}: NicknameFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nickname = sanitizeNickname(value);
    if (!nickname) {
      setError("닉네임을 다시 확인해주세요 (1~10자, 부적절한 표현 제외)");
      return;
    }
    setError(null);
    onSubmit(nickname);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="paper-card flex flex-1 flex-col justify-center gap-5 rounded-2xl p-6"
    >
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-foreground/60">{description}</p>
        )}
      </div>
      <div>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={10}
          placeholder="닉네임을 입력하세요"
          className="w-full rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-base outline-none focus:border-brand"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      <button
        type="submit"
        className="rounded-xl bg-brand px-4 py-3 text-base font-bold text-white transition-transform active:scale-95"
      >
        {submitLabel}
      </button>
    </form>
  );
}
