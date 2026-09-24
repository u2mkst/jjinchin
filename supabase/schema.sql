-- 찐친력 Supabase 스키마 초안 (PLAN.md 9번 참고)
-- 회원가입 없이 세션 단위로만 데이터를 저장하고 7일 뒤 삭제한다.

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id text primary key,
  question_set text not null default 'default',
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

create table if not exists participants (
  id text primary key,
  session_id text not null references sessions (id) on delete cascade,
  role text not null check (role in ('A', 'B')),
  nickname text not null,
  answers jsonb not null default '{}',
  predictions jsonb not null default '{}',
  submitted_at timestamptz,
  unique (session_id, role)
);

create index if not exists participants_session_id_idx on participants (session_id);

-- 만료된 세션 정리용 (pg_cron 등으로 주기 실행)
-- delete from sessions where expires_at < now();

alter table sessions enable row level security;
alter table participants enable row level security;

-- 회원가입이 없으므로 세션/참가자 ID(추측 불가능한 랜덤 문자열)를 아는 사람만
-- 클라이언트에서 접근하도록 anon 키에 최소 권한만 부여한다.
create policy "anon can read sessions" on sessions
  for select using (true);
create policy "anon can insert sessions" on sessions
  for insert with check (true);

create policy "anon can read participants" on participants
  for select using (true);
create policy "anon can insert participants" on participants
  for insert with check (true);
