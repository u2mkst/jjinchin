# 찐친력

> 친구와 링크 하나로 함께 답하고, 서로를 얼마나 아는지 "찐친력 점수"로 보여주는 2인용 테스트.

전체 기획은 [`PLAN.md`](./PLAN.md)를 참고하세요.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

`.env.local`에 Supabase 프로젝트의 URL/키가 필요합니다 (`.env.example` 참고).
두 사람이 참여하는 흐름(초대 → 참여 → 결과 공개)은 서로 다른 브라우저(또는
다른 기기)에서 테스트할 수 있습니다: `/start`에서 테스트를 만들고, 생성된
`/s/[id]` 링크를 다른 브라우저에 붙여넣어 친구 역할로 참여해보세요.

## 현재 구현 상태 (MVP)

| # | 기능 | 상태 |
|---|---|---|
| F1 | 랜딩 페이지 | ✅ `app/page.tsx` |
| F2/F3 | 닉네임 입력 + 10문항 진행 | ✅ `app/start`, `components/NicknameForm.tsx`, `components/QuestionFlow.tsx` |
| F4 | 초대 링크 생성/공유 | ✅ `components/ShareLinks.tsx` (Web Share API + 링크 복사) |
| F5 | 대기 화면 + 실시간 참여 감지 | ✅ `app/s/[id]` (Supabase Realtime `postgres_changes` + 폴링 폴백) |
| F6 | 친구 참여 흐름 | ✅ `app/s/[id]` |
| F7 | 결과 계산 (일치율/이해도/착각 포인트) | ✅ `lib/scoring.ts` |
| F8 | 분석 중 연출 | ✅ `components/LoadingAnalysis.tsx` |
| F9 | 결과 화면 (점수/관계 별명) | ✅ `components/ResultCard.tsx`, `data/resultTags.ts` |
| F10 | 결과 카드 저장/공유, OG 미리보기 | ✅ `html-to-image` 저장 + `app/s/[id]/page.tsx`의 `generateMetadata` |
| F11 | 7일 후 자동 삭제 | ✅ 조회 시 만료 체크(`lib/store.ts`) + Supabase `pg_cron` 매일 03:00 UTC 삭제 job |
| 1인 맛보기 | 5문항 밈 카드 | ✅ `app/mini` |

### 데이터 저장소: Supabase (PostgreSQL)

`lib/store.ts`는 Supabase(`gonhucxzavmxypqgubwp` 프로젝트, ap-northeast-1)의
`sessions`/`participants` 테이블을 사용합니다.

- 스키마/RLS/realtime publication: `supabase/schema.sql` (Supabase 대시보드의
  마이그레이션 이력에도 `init_sessions_participants`,
  `schedule_expired_session_cleanup`으로 반영되어 있습니다)
- 친구 참여 실시간 감지: `participants` 테이블에 대한 Supabase Realtime
  `postgres_changes` 구독 + 4초 폴링 폴백(`lib/store.ts`의
  `subscribeToSession`)
- 7일 만료 자동 삭제: 클라이언트 조회 시 `expires_at` 체크 + `pg_cron`으로
  매일 03:00 UTC에 `delete from sessions where expires_at < now()` 실행
- "내가 이 세션에서 누구(A/B)인지"는 브라우저 탭 단위 `sessionStorage`에
  저장합니다 (한 브라우저에서 자기 초대 링크를 새 탭으로 열어봐도 참가자
  식별이 꼬이지 않도록)

로컬에서 실행하려면 `.env.example`을 참고해 `.env.local`에
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 채워야 합니다.
**Vercel에 배포할 때도 이 두 환경변수를 프로젝트 설정에 동일하게 등록해야
동작합니다.**

> 참고: 이 값들은 공개 브라우저에 노출되는 publishable/anon 키이며,
> `sessions`/`participants` 테이블은 회원가입 없이 누구나 세션 ID만 알면
> 읽고 쓸 수 있도록 RLS를 열어뒀습니다(추측 불가능한 랜덤 ID로 접근 제어).
> 민감 정보를 저장하지 않는 이 서비스 특성상 의도된 설계입니다.

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

- 카카오톡 공유 SDK (현재는 Web Share API + 링크 복사만 지원)
- 관계 별명 문구 확장 (현재 15종 → 계획서 목표 30~50종)
- 지인 테스트를 통한 문구/난이도 튜닝
- Vercel 배포 시 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  환경변수 등록

### 알려진 제약: 이 개발 환경에서는 Supabase 실연동을 브라우저로 확인하지 못함

이 세션이 실행되는 샌드박스는 조직 아웃바운드 정책상 `*.supabase.co`로 나가는
연결을 차단합니다(프록시가 403으로 거부, WebSocket도 별도로 미지원). 그래서
Playwright로 실제 두 브라우저가 Supabase를 통해 동기화되는 것까지는 이
환경에서 직접 확인하지 못했습니다. 대신 Supabase MCP의 SQL 실행 도구로
`sessions`/`participants` 테이블에 대해 앱과 동일한 시퀀스(세션 생성 → 참가자
A 삽입 → 참가자 B 삽입 → 중복 참여 시 unique 제약 확인 → 만료 삭제)를 직접
실행해 스키마와 쿼리 로직은 검증했습니다. 실제 배포 환경(Vercel)이나 로컬
PC에서는 이런 제약이 없으니 두 기기로 정상 테스트할 수 있을 것으로
예상하지만, 배포 후 실제 확인을 권장합니다.
