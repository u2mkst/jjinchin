import Link from "next/link";
import { getCompletedPairCount } from "@/lib/stats";

export const revalidate = 60;

export default async function LandingPage() {
  const pairCount = await getCompletedPairCount();

  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="pt-8 text-center">
        <p className="sticker mx-auto -rotate-2 bg-accent-mint px-3 py-1 text-xs font-bold text-brand-dark uppercase">
          우리 우정 성적표
        </p>
        <h1 className="mt-3 font-display text-5xl text-brand">
          <span className="animate-wiggle inline-block">✨</span> 찐친력{" "}
          <span className="animate-wiggle inline-block">✨</span>
        </h1>
        <p className="mt-3 text-base text-foreground/70">
          친구와 링크 하나로 같은 질문에 답하고,
          <br />
          서로를 얼마나 아는지 점수로 확인해보세요.
        </p>
        {pairCount !== null && pairCount > 0 && (
          <p className="sticker mx-auto mt-4 rotate-1 bg-white px-3 py-1 text-xs font-bold text-brand-dark">
            🔥 지금까지 {pairCount.toLocaleString("ko-KR")}쌍이 확인했어요
          </p>
        )}
      </header>

      <div className="paper-card mx-auto flex w-full max-w-[240px] rotate-2 flex-col items-center gap-2 rounded-2xl p-5 text-center">
        <span className="tape" />
        <p className="text-xs font-bold tracking-widest text-brand uppercase">
          예시 결과
        </p>
        <p className="font-display text-6xl text-brand">87점</p>
        <span className="sticker bg-accent px-3 py-1 text-xs font-bold text-brand-dark">
          A등급
        </span>
        <p className="font-display text-lg text-foreground">
          겉바속촉 이해심 만렙
        </p>
        <p className="text-xs text-foreground/60">
          성향은 다르지만 상대 마음은 기가 막히게 읽어내는 편
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/start"
          className="rounded-xl bg-brand px-4 py-4 text-center text-lg font-bold text-white transition-transform hover:-rotate-1 active:scale-95 active:rotate-0"
        >
          친구와 찐친력 테스트하기 🔥
        </Link>
        <Link
          href="/mini"
          className="rounded-xl border-2 border-brand-dark bg-white px-4 py-3 text-center text-sm font-semibold transition-transform hover:rotate-1 active:scale-95 active:rotate-0"
        >
          1인 맛보기 먼저 해보기 👀
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="sticker -rotate-1 self-start bg-accent-lavender px-3 py-1 text-xs font-bold text-brand-dark">
          ✅ 회원가입 없이 닉네임만으로 시작
        </p>
        <p className="sticker rotate-1 self-end bg-accent-mint px-3 py-1 text-xs font-bold text-brand-dark">
          ✅ 같은 질문에 답하고 서로를 예측
        </p>
        <p className="sticker -rotate-1 self-start bg-accent px-3 py-1 text-xs font-bold text-brand-dark">
          ✅ 일치율 · 이해도 · 착각 포인트까지 공개
        </p>
        <p className="sticker rotate-1 self-end bg-white px-3 py-1 text-xs font-bold text-brand-dark">
          ✅ 결과는 7일 뒤 자동 삭제
        </p>
      </div>

      <footer className="pb-4 text-center text-xs text-foreground/40">
        <Link href="/privacy" className="underline">
          개인정보 처리방침
        </Link>
      </footer>
    </div>
  );
}
