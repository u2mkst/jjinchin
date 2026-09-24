"use client";

import Link from "next/link";
import { useState } from "react";
import { MINI_QUESTIONS } from "@/data/miniQuestions";
import { getMiniPersona } from "@/data/miniResults";

export default function MiniPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const isDone = stepIndex >= MINI_QUESTIONS.length;
  const question = MINI_QUESTIONS[stepIndex];

  function choose(optionIndex: number) {
    setAnswers((prev) => [...prev, optionIndex]);
    setStepIndex((i) => i + 1);
  }

  if (isDone) {
    const persona = getMiniPersona(answers);
    return (
      <div className="flex flex-1 flex-col gap-6">
        <div className="paper-card flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center">
          <p className="text-xs font-bold tracking-widest text-brand uppercase">
            나 이럴 때 이런 사람
          </p>
          <p className="text-6xl">{persona.emoji}</p>
          <h1 className="text-2xl font-bold">{persona.title}</h1>
          <p className="text-sm text-foreground/70">{persona.line}</p>
        </div>

        <Link
          href="/start"
          className="rounded-xl bg-brand px-4 py-4 text-center text-lg font-bold text-white transition-transform active:scale-95"
        >
          친구와 찐친력도 재볼래?
        </Link>
        <Link
          href="/"
          className="text-center text-sm font-semibold text-foreground/50 underline"
        >
          처음으로
        </Link>
      </div>
    );
  }

  const progress = Math.round(((stepIndex + 1) / MINI_QUESTIONS.length) * 100);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <div className="mb-2 flex justify-between text-xs font-semibold text-foreground/60">
          <span>
            {stepIndex + 1} / {MINI_QUESTIONS.length}
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
        <h2 className="text-xl leading-snug font-bold">{question.text}</h2>
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => choose(index)}
              className="rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-left text-sm font-medium transition-colors hover:border-brand/50"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
