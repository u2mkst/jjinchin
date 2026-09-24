# 찐친력

> 친구와 링크 하나로 함께 답하고, 서로를 얼마나 아는지 "찐친력 점수"로 보여주는 2인용 테스트.

전체 기획은 [`PLAN.md`](./PLAN.md)를 참고하세요.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

두 사람이 참여하는 흐름(초대 → 참여 → 결과 공개)은 브라우저 두 탭으로 열어서
테스트할 수 있습니다: `/start`에서 테스트를 만들고, 생성된 `/s/[id]` 링크를
새 탭(또는 시크릿 창)에 붙여넣어 친구 역할로 참여해보세요.

## 현재 구현 상태 (MVP)

| # | 기능 | 상태 |
|---|---|---|
| F1 | 랜딩 페이지 | ✅ `app/page.tsx` |
| F2/F3 | 닉네임 입력 + 10문항 진행 | ✅ `app/start`, `components/NicknameForm.tsx`, `components/QuestionFlow.tsx` |
| F4 | 초대 링크 생성/공유 | ✅ `components/ShareLinks.tsx` (Web Share API + 링크 복사) |
| F5 | 대기 화면 + 실시간 참여 감지 | ✅ `app/s/[id]` (BroadcastChannel + storage 이벤트 + 폴링) |
| F6 | 친구 참여 흐름 | ✅ `app/s/[id]` |
| F7 | 결과 계산 (일치율/이해도/착각 포인트) | ✅ `lib/scoring.ts` |
| F8 | 분석 중 연출 | ✅ `components/LoadingAnalysis.tsx` |
| F9 | 결과 화면 (점수/관계 별명) | ✅ `components/ResultCard.tsx`, `data/resultTags.ts` |
| F10 | 결과 카드 저장/공유, OG 미리보기 | ✅ `html-to-image` 저장 + `app/s/[id]/page.tsx`의 `generateMetadata` |
| F11 | 7일 후 자동 삭제 | ✅ `lib/store.ts` (조회 시 만료 체크) |
| 1인 맛보기 | 5문항 밈 카드 | ✅ `app/mini` |

### 데이터 저장소: 지금은 로컬, 나중은 Supabase

Supabase 프로젝트 생성은 사람이 직접 가입해야 하는 작업이라(계획서 15번),
지금은 `lib/store.ts`가 **브라우저 localStorage + BroadcastChannel**로
세션/참가자 데이터를 저장하고 실시간 참여를 감지합니다. 같은 기기의 다른
탭끼리는 바로 동작하지만, 서로 다른 기기 간 실시간 동기화는 되지 않습니다.

실제 배포 시에는:

1. Supabase 프로젝트를 만들고 `supabase/schema.sql`을 실행합니다.
2. `.env.example`을 참고해 `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 채웁니다.
3. `lib/store.ts`의 함수 시그니처(`createSession`, `joinSession`,
   `getSession`, `subscribeToSession`)를 유지한 채 내부 구현을 Supabase
   클라이언트(`lib/supabase.ts`) 호출로 교체합니다 (realtime 구독으로
   기기 간 동기화 가능).

## 폴더 구조

```
app/
  page.tsx          # 랜딩 (F1)
  start/            # 닉네임 + 질문 흐름 (F2, F3)
  s/[id]/           # 초대 · 대기 · 참여 · 결과 (F4~F10)
  mini/             # 1인 맛보기
  privacy/          # 개인정보 처리방침
components/         # NicknameForm, QuestionFlow, ShareLinks, LoadingAnalysis, ResultCard
data/               # 질문, 결과 문구(관계 별명), 1인 맛보기 문항/결과
lib/                # 타입, 점수 계산, 저장소(store), id 생성, supabase 클라이언트
supabase/schema.sql # Supabase 전환 시 사용할 테이블 스키마
```

## 아직 안 한 것 (다음 단계)

- Supabase 연동 (기기 간 실시간 동기화)
- 카카오톡 공유 SDK (현재는 Web Share API + 링크 복사만 지원)
- 관계 별명 문구 확장 (현재 15종 → 계획서 목표 30~50종)
- 지인 테스트를 통한 문구/난이도 튜닝
