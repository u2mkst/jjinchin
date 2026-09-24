export interface SoloInsight {
  emoji: string;
  title: string;
  line: string;
}

/**
 * 친구가 아직 참여하지 않았어도, 내 답변만으로 바로 보여줄 수 있는 개인 성향 카드.
 * 계획서 7번(바이럴 장치) "혼자 한 결과도 제공"을 구현한 콘텐츠.
 */
const SOLO_INSIGHTS: Record<string, SoloInsight[]> = {
  friend: [
    {
      emoji: "😎",
      title: "쿨내 진동 프렌드",
      line: "웬만한 일엔 흔들리지 않는 쿨内 담당. 근데 진짜 서운하면 티도 안 내고 손절각 잼",
    },
    {
      emoji: "🥹",
      title: "정 많은 살림꾼 프렌드",
      line: "은근히 다 챙기고 기억하는 타입. 단톡방 분위기 메이커는 못 돼도 진국인 스타일",
    },
    {
      emoji: "🕵️",
      title: "눈치 백단 프렌드",
      line: "말 안 해도 다 캐치하는 촉 좋은 관찰형. 대신 티는 잘 안 내는 편",
    },
    {
      emoji: "🎉",
      title: "텐션 뿜뿜 프렌드",
      line: "즉흥적이고 텐션 담당. 계획은 약해도 재미는 확실하게 챙기는 스타일",
    },
    {
      emoji: "🧮",
      title: "칼각 정산러 프렌드",
      line: "우정도 소중하고 1원 단위 정산도 소중한 밸런스형 인간",
    },
    {
      emoji: "🫡",
      title: "믿음직한 의리파 프렌드",
      line: "리액션은 적어도 결정적 순간엔 항상 옆에 있는 든든한 존재",
    },
  ],
  couple: [
    {
      emoji: "🥰",
      title: "표현 만렙 연애러",
      line: "좋으면 좋다고 바로 말하는 직진형. 상대가 숨 쉴 틈은 있어야 함",
    },
    {
      emoji: "🫠",
      title: "잔잔한 순정파 연애러",
      line: "티는 안 내도 마음은 이미 다 준 스타일. 은근한 서운함은 속으로 삭히는 편",
    },
    {
      emoji: "📅",
      title: "이벤트 장인 연애러",
      line: "기념일·서프라이즈 절대 안 놓치는 계획형 로맨티스트",
    },
    {
      emoji: "🌿",
      title: "쿨한 자유 연애러",
      line: "각자 시간도 소중하게 생각하는 쿨거상. 그렇다고 애정이 없는 건 절대 아님",
    },
    {
      emoji: "🐿️",
      title: "은근 집착 연애러",
      line: "겉으론 쿨한 척해도 답장 늦으면 마음속으로 온갖 시나리오 씀",
    },
    {
      emoji: "🤝",
      title: "밸런스 마스터 연애러",
      line: "다투다가도 결국 대화로 잘 풀어내는 안정적인 연애 스타일",
    },
  ],
  coworker: [
    {
      emoji: "🚀",
      title: "일 처리 스피드러",
      line: "받으면 바로 끝내는 실행력 담당. 야근도 마다 않는 책임감파",
    },
    {
      emoji: "🧊",
      title: "선 확실한 프로 동료",
      line: "워라밸은 지키되 맡은 일은 확실하게. 적당한 거리감이 편한 타입",
    },
    {
      emoji: "🗣️",
      title: "회의 분위기 메이커",
      line: "의견도 리액션도 적극적. 있으면 회의가 술술 풀리는 존재",
    },
    {
      emoji: "🤫",
      title: "묵묵한 서포터형 동료",
      line: "말은 적어도 뒤에서 다 챙기는 스타일. 없으면 티 나는 존재감",
    },
    {
      emoji: "🧭",
      title: "협업 내비게이터",
      line: "역할 분담과 일정 관리에 진심인 프로 협업러",
    },
    {
      emoji: "☕",
      title: "여유 있는 밸런스형 동료",
      line: "급할 때 급하고 아닐 땐 여유롭게. 같이 일하기 편안한 스타일",
    },
  ],
};

export function getSoloInsight(
  packId: string,
  answers: Record<string, number>,
): SoloInsight {
  const list = SOLO_INSIGHTS[packId] ?? SOLO_INSIGHTS.friend;
  const sum = Object.values(answers).reduce((acc, v) => acc + v, 0);
  return list[sum % list.length];
}
