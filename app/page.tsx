import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="pt-8 text-center">
        <p className="text-sm font-bold tracking-widest text-brand uppercase">
          우리 우정 성적표
        </p>
        <h1 className="mt-2 text-4xl font-black">찐친력</h1>
        <p className="mt-3 text-base text-foreground/70">
          친구와 링크 하나로 같은 질문에 답하고,
          <br />
          서로를 얼마나 아는지 점수로 확인해보세요.
        </p>
      </header>

      <div className="paper-card mx-auto flex w-full max-w-[240px] flex-col items-center gap-2 rounded-2xl p-5 text-center">
        <p className="text-xs font-bold tracking-widest text-brand uppercase">
          예시 결과
        </p>
        <p className="text-5xl font-black text-brand">87점</p>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-brand-dark">
          A등급
        </span>
        <p className="text-sm font-bold">겉바속촉 이해심 만렙</p>
        <p className="text-xs text-foreground/60">
          성향은 다르지만 상대 마음은 기가 막히게 읽어내는 편
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/start"
          className="rounded-xl bg-brand px-4 py-4 text-center text-lg font-bold text-white transition-transform active:scale-95"
        >
          친구와 찐친력 테스트하기
        </Link>
        <Link
          href="/mini"
          className="rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-center text-sm font-semibold transition-transform active:scale-95"
        >
          1인 맛보기 먼저 해보기
        </Link>
      </div>

      <ul className="paper-card flex flex-col gap-2 rounded-2xl p-5 text-sm text-foreground/70">
        <li>✅ 회원가입 없이 닉네임만으로 시작</li>
        <li>✅ 같은 질문에 답하고 서로를 예측</li>
        <li>✅ 일치율 · 이해도 · 착각 포인트까지 공개</li>
        <li>✅ 결과는 7일 뒤 자동 삭제</li>
      </ul>

      <footer className="pb-4 text-center text-xs text-foreground/40">
        <Link href="/privacy" className="underline">
          개인정보 처리방침
        </Link>
      </footer>
    </div>
  );
}
