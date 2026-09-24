import type { Question } from "@/lib/types";

/**
 * 10문항: A형(내 답만) 7개 + B형(내 답 + "내 친구라면?" 예측) 3개.
 * isPrediction: true 인 질문만 예측 단계를 추가로 받는다.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    topic: "약속 취소",
    text: "약속 30분 전에 상대가 갑자기 취소하면?",
    options: [
      "오히려 좋아, 집에서 뒹굴거림",
      "티는 안 내지만 살짝 서운함",
      "바로 다른 약속 잡음",
      "왜 취소했는지부터 캐물음",
    ],
    isPrediction: true,
  },
  {
    id: "q2",
    topic: "읽씹",
    text: "카톡 보냈는데 3시간째 읽씹이면?",
    options: [
      "신경도 안 씀, 원래 그런 애임",
      "무슨 일 있나 걱정됨",
      "'읽씹?' 하고 한 번 더 보냄",
      "'얘 봤네' 하고 서운해함",
    ],
    isPrediction: false,
  },
  {
    id: "q3",
    topic: "연락 빈도",
    text: "친한 친구와 이상적인 연락 빈도는?",
    options: [
      "매일 시시콜콜 다 얘기함",
      "며칠에 한 번, 필요할 때만",
      "한 달에 한두 번이어도 괜찮음",
      "연락은 뜸해도 만나면 바로 텐션 업",
    ],
    isPrediction: true,
  },
  {
    id: "q4",
    topic: "돈 계산",
    text: "친구랑 밥 먹고 계산할 때 나는?",
    options: [
      "정확히 반반, 1원 단위까지 깔끔하게",
      "대충 반반, 애매하면 내가 좀 더 냄",
      "이번엔 내가 살게~ 다음에 얻어먹지",
      "누가 냈는지 잘 기억 안 남",
    ],
    isPrediction: false,
  },
  {
    id: "q5",
    topic: "싸움 후 화해",
    text: "친구와 다툰 뒤 화해하는 나의 방식은?",
    options: [
      "먼저 연락해서 바로 풀자고 함",
      "시간을 좀 두고 자연스럽게 넘어감",
      "상대가 먼저 연락 오길 기다림",
      "은근슬쩍 아무 일 없었다는 듯 대화 시작",
    ],
    isPrediction: true,
  },
  {
    id: "q6",
    topic: "비밀 공유",
    text: "나만 아는 진짜 비밀, 친구에게는?",
    options: [
      "제일 친한 친구한테는 다 얘기함",
      "상황 봐서 필요한 만큼만 얘기함",
      "비밀은 원래 나만 아는 거임",
      "취했을 때 실수로 다 말해버림",
    ],
    isPrediction: false,
  },
  {
    id: "q7",
    topic: "여행 스타일",
    text: "친구와 여행 갈 때 나는?",
    options: [
      "계획표 짜는 J, 시간 딱딱 맞춤",
      "큰 틀만 정하고 즉흥적으로 다님",
      "다 맡길게, 따라만 다닐래",
      "먹는 거 위주로만 계획함",
    ],
    isPrediction: false,
  },
  {
    id: "q8",
    topic: "서운함 표현",
    text: "친구에게 서운한 일이 있을 때 나는?",
    options: [
      "바로 솔직하게 말함",
      "돌려서 티 나게 말함",
      "말 안 하고 혼자 삭힘",
      "다른 친구한테 먼저 하소연함",
    ],
    isPrediction: false,
  },
  {
    id: "q9",
    topic: "절친 정의",
    text: "나에게 '진짜 친구'란?",
    options: [
      "언제 연락해도 어색하지 않은 사이",
      "힘들 때 제일 먼저 생각나는 사람",
      "내 흑역사를 다 알고 있는 사람",
      "말 안 해도 내 상태를 알아채는 사람",
    ],
    isPrediction: false,
  },
  {
    id: "q10",
    topic: "손절 기준",
    text: "이럴 때 손절 각을 재는 편이다",
    options: [
      "약속을 반복해서 어길 때",
      "뒷담화를 하고 다닌다는 걸 알았을 때",
      "돈 문제가 생겼을 때",
      "연락이 점점 뜸해질 때",
    ],
    isPrediction: false,
  },
];

export const PREDICTION_QUESTION_COUNT = QUESTIONS.filter(
  (q) => q.isPrediction,
).length;

export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
