export interface MiniPersona {
  title: string;
  emoji: string;
  line: string;
}

/** 5문항 답변 인덱스 합(0~15)을 8구간으로 나눠 밈 카드 결과를 매핑 */
export const MINI_PERSONAS: MiniPersona[] = [
  {
    title: "쿨내 진동 프로",
    emoji: "😎",
    line: "웬만한 일엔 흔들리지 않는 쿨内 담당. 근데 진짜 서운하면 티도 안 내고 손절각 잼",
  },
  {
    title: "유리멘탈 인싸",
    emoji: "🥲",
    line: "겉으론 밝은데 마음속엔 서운함 아카이브가 따로 있는 타입",
  },
  {
    title: "즉흥 텐션 뿜뿜러",
    emoji: "🎉",
    line: "계획 없이도 어떻게든 재밌게 만드는 텐션 담당. 대신 정산은 남에게",
  },
  {
    title: "분 단위 J형 인간",
    emoji: "📋",
    line: "약속도 계획도 칼같이. 친구들 사이 '총무' 포지션 확정",
  },
  {
    title: "우리 반 탐정",
    emoji: "🕵️",
    line: "다들 모르는 걸 나만 캐치하는 촉 좋은 관찰형. 눈치 100단",
  },
  {
    title: "말없이 다 챙기는 형",
    emoji: "🫶",
    line: "리액션은 적어도 결정적 순간엔 항상 옆에 있는 은근 든든한 존재",
  },
  {
    title: "정산 앱 필수 소지자",
    emoji: "🧮",
    line: "우정도 소중하고 1원 단위 정산도 소중한 완벽주의 밸런스형",
  },
  {
    title: "단톡방 숨은 실세",
    emoji: "👑",
    line: "말은 없어도 방향을 정하는 은근한 리더. 다들 눈치는 채고 있음",
  },
];

export function getMiniPersona(answers: number[]): MiniPersona {
  const sum = answers.reduce((acc, v) => acc + v, 0);
  const index = sum % MINI_PERSONAS.length;
  return MINI_PERSONAS[index];
}
