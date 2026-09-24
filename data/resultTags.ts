export interface ResultTag {
  grade: string;
  title: string;
  line: string;
}

type Flavor = "match" | "understand" | "balanced";
type PackTagTable = Record<string, Record<Flavor, ResultTag>>;

/**
 * 팩(친구/커플/직장동료)별 점수 구간(5) x 성향/이해도 비교(3) = 15종씩,
 * 총 45종의 관계 별명. 계획서(section 6)의 30~50종 목표에 맞춘 세트.
 */
const FRIEND_TAGS: PackTagTable = {
  S: {
    match: {
      grade: "S",
      title: "말 안 해도 아는 척하는 사이",
      line: "성향도 비슷하고 서로 예측도 다 맞춤. 이쯤 되면 텔레파시 아님?",
    },
    understand: {
      grade: "S",
      title: "정반대인데 완벽 이해 콤비",
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

const COUPLE_TAGS: PackTagTable = {
  S: {
    match: {
      grade: "S",
      title: "결이 똑같은 천생연분",
      line: "취향도 예측도 다 맞음. 전생에 부부였던 거 아님?",
    },
    understand: {
      grade: "S",
      title: "정반대라서 완벽한 커플",
      line: "성향은 극과 극인데 서로 마음은 기가 막히게 읽어냄",
    },
    balanced: {
      grade: "S",
      title: "결혼해도 되는 케미",
      line: "일치율도 이해도도 만점권. 주변에서 부러워할 각",
    },
  },
  A: {
    match: {
      grade: "A",
      title: "닮은꼴 커플",
      line: "취향도 생각도 비슷해서 같이 있으면 편안한 사이",
    },
    understand: {
      grade: "A",
      title: "속마음 다 읽히는 사이",
      line: "취향은 달라도 상대 마음은 눈빛만 봐도 아는 편",
    },
    balanced: {
      grade: "A",
      title: "안정적인 러브라인",
      line: "가끔 삐걱대도 대체로 잘 맞춰가는, 믿음직한 커플",
    },
  },
  B: {
    match: {
      grade: "B",
      title: "취향은 통하는데 아직 서툰 사이",
      line: "좋아하는 건 비슷한데 서로 예측은 아직 어설픈 편",
    },
    understand: {
      grade: "B",
      title: "티격태격 러브 코미디",
      line: "성향은 반대라 다투기도 하지만 은근히 서로를 잘 캐치함",
    },
    balanced: {
      grade: "B",
      title: "무난하게 알콩달콩한 사이",
      line: "크게 안 맞는 것도 잘 맞는 것도 없는, 무난 커플",
    },
  },
  C: {
    match: {
      grade: "C",
      title: "취향만 겨우 맞는 사이",
      line: "좋아하는 건 비슷한데 서로 예측은 자꾸 빗나감",
    },
    understand: {
      grade: "C",
      title: "안 친한 척 잘 아는 사이",
      line: "취향은 안 맞는데 의외로 마음은 잘 읽어내는 신기한 조합",
    },
    balanced: {
      grade: "C",
      title: "티격태격 밀당 커플",
      line: "안 맞아서 투닥거리지만 그게 또 나름의 재미인 사이",
    },
  },
  D: {
    match: {
      grade: "D",
      title: "아직은 탐색전인 사이",
      line: "서로에 대한 예측도 취향도 물음표. 이제부터 알아가면 됨",
    },
    understand: {
      grade: "D",
      title: "동상이몽 커플",
      line: "생각도 예측도 정반대. 그래서 더 흥미진진할지도",
    },
    balanced: {
      grade: "D",
      title: "새로고침이 필요한 커플",
      line: "이번 결과는 낮아도 대화를 더 나누면 금방 올라갈 각",
    },
  },
};

const COWORKER_TAGS: PackTagTable = {
  S: {
    match: {
      grade: "S",
      title: "손발이 척척 맞는 콤비",
      line: "업무 스타일도 예측도 다 맞음. 이 정도면 최고의 파트너",
    },
    understand: {
      grade: "S",
      title: "스타일은 달라도 찰떡 호흡",
      line: "일하는 방식은 정반대인데 서로 니즈는 기가 막히게 캐치함",
    },
    balanced: {
      grade: "S",
      title: "평생 함께 일하고 싶은 동료",
      line: "일치율도 이해도도 만점권. 이직해도 데려가고 싶은 사이",
    },
  },
  A: {
    match: {
      grade: "A",
      title: "같은 스타일 워커",
      line: "일하는 방식이 비슷해서 협업이 편안한 사이",
    },
    understand: {
      grade: "A",
      title: "눈치 백단 파트너",
      line: "스타일은 달라도 서로 상황은 기가 막히게 읽어내는 편",
    },
    balanced: {
      grade: "A",
      title: "믿고 맡기는 사이",
      line: "가끔 안 맞아도 대체로 척하면 척, 든든한 동료",
    },
  },
  B: {
    match: {
      grade: "B",
      title: "코드는 맞는데 아직 서먹한 사이",
      line: "일하는 스타일은 비슷한데 서로 파악은 아직 부족한 편",
    },
    understand: {
      grade: "B",
      title: "티격태격해도 일은 되는 사이",
      line: "스타일은 반대라 부딪히기도 하지만 은근히 잘 캐치함",
    },
    balanced: {
      grade: "B",
      title: "무난한 협업 파트너",
      line: "크게 안 맞는 것도 잘 맞는 것도 없는, 무난한 사이",
    },
  },
  C: {
    match: {
      grade: "C",
      title: "코드만 겨우 맞는 사이",
      line: "스타일은 비슷한데 서로 예측은 자꾸 빗나가는 편",
    },
    understand: {
      grade: "C",
      title: "안 친한 척 잘 아는 사이",
      line: "일하는 방식은 다른데 의외로 니즈는 잘 캐치하는 조합",
    },
    balanced: {
      grade: "C",
      title: "티격태격 협업러",
      line: "안 맞아서 투닥거리지만 결국 일은 마무리되는 사이",
    },
  },
  D: {
    match: {
      grade: "D",
      title: "아직은 낯선 동료",
      line: "서로 스타일도 예측도 물음표. 이제부터 맞춰가면 됨",
    },
    understand: {
      grade: "D",
      title: "동상이몽 협업",
      line: "일하는 방식도 예측도 정반대. 그래도 나름 재밌는 조합",
    },
    balanced: {
      grade: "D",
      title: "새로고침이 필요한 협업",
      line: "이번 결과는 낮아도 몇 번 더 같이 일해보면 달라질 각",
    },
  },
};

const TAG_TABLE_BY_PACK: Record<string, PackTagTable> = {
  friend: FRIEND_TAGS,
  couple: COUPLE_TAGS,
  coworker: COWORKER_TAGS,
};

function gradeOf(score: number): keyof PackTagTable {
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
  packId: string = "friend",
): ResultTag {
  const table = TAG_TABLE_BY_PACK[packId] ?? FRIEND_TAGS;
  const grade = gradeOf(score);
  const diff = matchRate - understandRate;
  let flavor: Flavor = "balanced";
  if (diff > 0.15) flavor = "match";
  else if (diff < -0.15) flavor = "understand";
  return table[grade][flavor];
}
