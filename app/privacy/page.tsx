export const metadata = {
  title: "개인정보 처리방침 — 찐친력",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 py-4 text-sm leading-relaxed text-foreground/80">
      <h1 className="font-display text-2xl text-brand">개인정보 처리방침</h1>
      <p>
        찐친력(이하 &quot;서비스&quot;)은 회원가입 없이 이용할 수 있으며,
        테스트 진행을 위해 아래 정보만 최소한으로 수집합니다.
      </p>

      <section className="flex flex-col gap-1">
        <h2 className="font-bold text-foreground">1. 수집하는 정보</h2>
        <p>테스트 중 입력한 닉네임, 질문에 대한 답변 및 예측 응답</p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-bold text-foreground">2. 보관 기간</h2>
        <p>
          세션(테스트) 데이터는 생성일로부터 7일간 보관 후 자동으로
          삭제됩니다.
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-bold text-foreground">3. 제3자 제공</h2>
        <p>수집한 정보를 외부에 판매하거나 제공하지 않습니다.</p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-bold text-foreground">4. 문의</h2>
        <p>서비스 관련 문의는 운영자에게 연락해주세요.</p>
      </section>
    </div>
  );
}
