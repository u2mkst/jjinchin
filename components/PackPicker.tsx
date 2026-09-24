"use client";

import { QUESTION_PACKS } from "@/data/questionPacks";

interface PackPickerProps {
  onSelect: (packId: string) => void;
}

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1"];

export function PackPicker({ onSelect }: PackPickerProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      <div className="text-center">
        <p className="sticker mx-auto rotate-1 bg-accent px-3 py-1 text-xs font-bold text-brand-dark uppercase">
          누구랑 할 거예요?
        </p>
        <h1 className="mt-3 font-display text-3xl text-brand">
          테스트 상대를 골라주세요
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {QUESTION_PACKS.map((pack, index) => (
          <button
            key={pack.id}
            type="button"
            onClick={() => onSelect(pack.id)}
            className={`paper-card flex items-center gap-4 rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5 active:scale-95 ${ROTATIONS[index % ROTATIONS.length]}`}
          >
            <span className="text-4xl">{pack.emoji}</span>
            <span>
              <span className="block font-display text-xl text-foreground">
                {pack.label}
              </span>
              <span className="block text-sm text-foreground/60">
                {pack.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
