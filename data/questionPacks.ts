import type { Question } from "@/lib/types";
import { QUESTIONS as FRIEND_QUESTIONS } from "@/data/questions";

export interface QuestionPack {
  id: string;
  label: string;
  emoji: string;
  description: string;
  questions: Question[];
}

const COUPLE_QUESTIONS: Question[] = [
  {
    id: "c1",
    topic: "연락 빈도",
    text: "연인과 이상적인 연락 빈도는?",
    options: [
      "아침부터 밤까지 실시간 중계",
      "출근길, 점심, 퇴근길 정도면 충분",
      "각자 바쁠 땐 하루에 한두 번",
      "필요할 때만 연락해도 서운하지 않음",
    ],
    isPrediction: true,
  },
  {
    id: "c2",
    topic: "데이트 스타일",
    text: "데이트 코스를 정할 때 나는?",
    options: [
      "동선까지 촘촘하게 짜는 계획형",
      "맛집만 정해두고 나머진 즉흥",
      "상대가 정하면 무조건 좋음",
      "집 데이트가 제일 편함",
    ],
    isPrediction: false,
  },
  {
    id: "c3",
    topic: "갈등 해결",
    text: "연인과 다퉜을 때 나는?",
    options: [
      "그 자리에서 끝장토론으로 풀어야 함",
      "각자 시간을 가진 뒤 대화함",
      "먼저 연락 오길 기다리는 편",
      "화해 선물이나 애교로 풀어버림",
    ],
    isPrediction: true,
  },
  {
    id: "c4",
    topic: "애정 표현",
    text: "내가 사랑을 표현하는 방식은?",
    options: [
      "말로 자주 직접 표현함",
      "스킨십으로 표현하는 편",
      "선물이나 이벤트로 표현함",
      "옆에서 챙겨주는 행동으로 표현함",
    ],
    isPrediction: false,
  },
  {
    id: "c5",
    topic: "기념일",
    text: "기념일을 챙기는 나의 온도는?",
    options: [
      "한 달 전부터 서프라이즈 준비",
      "당일에 맛있는 거 먹으면 충분",
      "숫자보다 마음이 중요하다 생각함",
      "솔직히 자주 까먹는 편",
    ],
    isPrediction: true,
  },
  {
    id: "c6",
    topic: "각자의 시간",
    text: "연애 중 개인 시간에 대한 내 생각은?",
    options: [
      "따로 노는 시간도 꼭 필요함",
      "가끔은 괜찮은데 너무 잦으면 서운함",
      "웬만하면 같이 하고 싶음",
      "각자 취미는 각자, 만날 때만 집중",
    ],
    isPrediction: false,
  },
  {
    id: "c7",
    topic: "질투 포인트",
    text: "이럴 때 살짝 질투 남",
    options: [
      "연락이 평소보다 늦어질 때",
      "이성 친구 얘기를 할 때",
      "나보다 다른 일정을 우선할 때",
      "SNS에 나 없는 사진만 올릴 때",
    ],
    isPrediction: false,
  },
  {
    id: "c8",
    topic: "미래 계획",
    text: "미래 얘기(결혼, 동거 등)를 나는?",
    options: [
      "만난 지 얼마 안 됐어도 편하게 꺼냄",
      "어느 정도 만난 뒤 자연스럽게 꺼냄",
      "상대가 먼저 꺼내주길 기다림",
      "아직은 먼 얘기라 생각함",
    ],
    isPrediction: false,
  },
  {
    id: "c9",
    topic: "연애관",
    text: "나에게 '좋은 연애'란?",
    options: [
      "편하게 있는 그대로 보여줄 수 있는 사이",
      "서로 계속 설레게 노력하는 사이",
      "다투더라도 결국 다시 맞춰가는 사이",
      "각자의 삶을 존중해주는 사이",
    ],
    isPrediction: false,
  },
  {
    id: "c10",
    topic: "이별 기준",
    text: "이럴 때 관계를 다시 생각하게 됨",
    options: [
      "거짓말이 반복될 때",
      "연락과 관심이 눈에 띄게 줄어들 때",
      "가치관이 안 맞는 게 계속 부딪힐 때",
      "서로를 위한 노력이 느껴지지 않을 때",
    ],
    isPrediction: false,
  },
];

const COWORKER_QUESTIONS: Question[] = [
  {
    id: "w1",
    topic: "업무 카톡",
    text: "퇴근 후 온 업무 카톡, 나는?",
    options: [
      "바로 확인하고 답장까지 함",
      "확인은 하되 답장은 다음날",
      "안 읽씹으로 다음날까지 미룸",
      "업무 알림은 아예 꺼둠",
    ],
    isPrediction: true,
  },
  {
    id: "w2",
    topic: "회식",
    text: "회식 자리에서 나는?",
    options: [
      "분위기 띄우는 흥 담당",
      "적당히 웃고 리액션하는 편",
      "먹는 것에만 집중함",
      "가능하면 빠지고 싶어함",
    ],
    isPrediction: false,
  },
  {
    id: "w3",
    topic: "업무 실수",
    text: "내가 실수했을 때 나는?",
    options: [
      "바로 인정하고 빠르게 수습함",
      "일단 혼자 해결해보려 함",
      "동료에게 먼저 상황을 공유함",
      "일단 숨기고 싶은 마음이 큼",
    ],
    isPrediction: true,
  },
  {
    id: "w4",
    topic: "점심 메뉴",
    text: "점심 메뉴 정할 때 나는?",
    options: [
      "적극적으로 메뉴 제안하는 편",
      "다수결 따라가는 편",
      "'아무거나' 대표주자",
      "혼자 먹는 게 더 편함",
    ],
    isPrediction: false,
  },
  {
    id: "w5",
    topic: "회의 스타일",
    text: "회의에서 나는?",
    options: [
      "의견을 적극적으로 먼저 냄",
      "질문받으면 그때 말하는 편",
      "일단 다 듣고 정리해서 말함",
      "회의보다 메신저로 얘기하는 게 편함",
    ],
    isPrediction: true,
  },
  {
    id: "w6",
    topic: "야근",
    text: "일이 몰릴 때 나는?",
    options: [
      "야근해서라도 그날 끝냄",
      "우선순위 정해서 내일로 넘길 건 넘김",
      "동료에게 도움을 요청함",
      "정시 퇴근은 지키고 다음날 처리",
    ],
    isPrediction: false,
  },
  {
    id: "w7",
    topic: "뒷담화",
    text: "동료가 상사 뒷담화를 시작하면?",
    options: [
      "적극적으로 맞장구침",
      "듣기만 하고 티는 안 냄",
      "은근슬쩍 화제를 돌림",
      "그런 자리 자체를 피하는 편",
    ],
    isPrediction: false,
  },
  {
    id: "w8",
    topic: "협업 스타일",
    text: "같이 일할 때 나는?",
    options: [
      "역할 분담을 칼같이 정하는 편",
      "상황 봐가며 유연하게 나눔",
      "내가 좀 더 맡아도 괜찮다는 주의",
      "각자 알아서 하고 결과만 합치는 게 편함",
    ],
    isPrediction: false,
  },
  {
    id: "w9",
    topic: "워라밸",
    text: "나에게 '좋은 동료'란?",
    options: [
      "일 잘하고 확실하게 책임지는 사람",
      "힘들 때 티키타카 잘 맞는 사람",
      "선 지키면서 예의 있는 사람",
      "굳이 안 친해도 무난하면 되는 사람",
    ],
    isPrediction: false,
  },
  {
    id: "w10",
    topic: "손절(거리두기) 기준",
    text: "이 동료와는 거리를 두게 됨",
    options: [
      "공을 가로채거나 책임을 미룰 때",
      "뒷담화를 내 얘기로 하고 다닐 때",
      "약속한 업무를 반복해서 미룰 때",
      "선을 넘는 사생활 참견을 할 때",
    ],
    isPrediction: false,
  },
];

export const QUESTION_PACKS: QuestionPack[] = [
  {
    id: "friend",
    label: "친구",
    emoji: "🫶",
    description: "우정 테스트 기본팩",
    questions: FRIEND_QUESTIONS,
  },
  {
    id: "couple",
    label: "커플",
    emoji: "💕",
    description: "연인과 함께하는 테스트",
    questions: COUPLE_QUESTIONS,
  },
  {
    id: "coworker",
    label: "직장동료",
    emoji: "💼",
    description: "동료와 함께하는 테스트",
    questions: COWORKER_QUESTIONS,
  },
];

export const DEFAULT_PACK_ID = "friend";

export function getPackById(id: string | null | undefined): QuestionPack {
  return QUESTION_PACKS.find((pack) => pack.id === id) ?? QUESTION_PACKS[0];
}
