export interface ResultTag {
  grade: string;
  title: string;
  line: string;
}

type Flavor = "match" | "understand" | "balanced";

/**
 * 점수 구간(5) x 성향/이해도 비교(3) = 15종 관계 별명.
 * 계획서(section 6)의 30~50종 목표를 위한 1차 세트이며, 이후 질문 팩과 함께 확장 예정.
 */
const TAG_TABLE: Record<string, Record<Flavor, ResultTag>> = {
  S: {
    match: {
      grade: "S",
      title: "말 안 해도 아는 척하는 사이",
      line: "성향도 비슷하고 서로 예측도 다 맞춤. 이쯤 되면 텔레파시 아님?",
    },
    understand: {
      grade: "S",
      title: "정반대인데 완벽 이해 커플",
      line: "취향은 정반대인데 상대를 너무 잘 알아서 무서운 케이스",
    },
    balanced: {
      grade: "S",
      title: "10년 뒤에도 단톡방에 남을 사이",
      line: "일치율도 이해도도 만점권. 이 정도면 평생 절친 각",
    },
  },
  A: {
    match: {
      grade: "A",
      title: "같은 종족 친구",
      line: "생각하는 게 비슷비슷해서 편하게 붙어다니는 사이",
    },
    understand: {
      grade: "A",
      title: "겉바속촉 이해심 만렙",
      line: "성향은 다르지만 상대 마음은 기가 막히게 읽어내는 편",
    },
    balanced: {
      grade: "A",
      title: "든든한 절친 라인",
      line: "가끔 어긋나도 대체로 척하면 척, 안심되는 조합",
    },
  },
  B: {
    match: {
      grade: "B",
      title: "취향은 통하는데 아직 낯 가리는 사이",
      line: "생각은 비슷한데 서로에 대한 확신은 아직 부족한 편",
    },
    understand: {
      grade: "B",
      title: "톰과 제리 케미",
      line: "성향은 정반대라 티격태격하지만 은근히 서로를 잘 파악함",
    },
    balanced: {
      grade: "B",
      title: "무난하게 친한 사이",
      line: "크게 어긋나는 것도 잘 맞는 것도 없는, 딱 무난한 케미",
    },
  },
  C: {
    match: {
      grade: "C",
      title: "취향만 겨우 통하는 사이",
      line: "비슷한 걸 좋아하긴 하는데 서로 예측은 자꾸 빗나가는 편",
    },
    understand: {
      grade: "C",
      title: "안 친한 척 잘 아는 사이",
      line: "생각하는 방식은 완전 다른데 의외로 예측은 맞히는 신기한 조합",
    },
    balanced: {
      grade: "C",
      title: "티격태격 케미",
      line: "안 맞아서 투닥거리지만 그게 또 나름의 재미인 사이",
    },
  },
  D: {
    match: {
      grade: "D",
      title: "아직은 낯선 사이",
      line: "서로에 대한 예측도, 취향도 아직은 물음표. 이제부터 알아가면 됨",
    },
    understand: {
      grade: "D",
      title: "동상이몽 콤비",
      line: "생각하는 것도 서로에 대한 예측도 정반대. 그래서 더 재밌을지도",
    },
    balanced: {
      grade: "D",
      title: "새로고침이 필요한 사이",
      line: "이번 결과는 낮아도 다음 판엔 역전할 수 있음, 리매치 가자",
    },
  },
};

function gradeOf(score: number): keyof typeof TAG_TABLE {
  if (score >= 90) return "S";
  if (score >= 75) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  return "D";
}

export function pickResultTag(
  score: number,
  matchRate: number,
  understandRate: number,
): ResultTag {
  const grade = gradeOf(score);
  const diff = matchRate - understandRate;
  let flavor: Flavor = "balanced";
  if (diff > 0.15) flavor = "match";
  else if (diff < -0.15) flavor = "understand";
  return TAG_TABLE[grade][flavor];
}
