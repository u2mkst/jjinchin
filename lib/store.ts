import { generateId } from "@/lib/id";
import { supabase } from "@/lib/supabase";
import type {
  AnswerMap,
  Participant,
  PredictionMap,
  Role,
  Session,
} from "@/lib/types";

/**
 * Supabase(PostgreSQL) 기반 데이터 저장소. 테이블 스키마는
 * `supabase/schema.sql` 참고 (sessions, participants + RLS + realtime).
 */

const MY_PARTICIPANT_PREFIX = "jjinchin:me:";

function isBrowser() {
  return typeof window !== "undefined";
}

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase가 설정되지 않았습니다. .env.local에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해주세요.",
    );
  }
  return supabase;
}

interface ParticipantRow {
  id: string;
  session_id: string;
  role: Role;
  nickname: string;
  answers: AnswerMap;
  predictions: PredictionMap;
  submitted_at: string | null;
}

interface SessionRow {
  id: string;
  created_at: string;
  expires_at: string;
}

function mapParticipant(row: ParticipantRow): Participant {
  return {
    id: row.id,
    sessionId: row.session_id,
    role: row.role,
    nickname: row.nickname,
    answers: row.answers ?? {},
    predictions: row.predictions ?? {},
    submittedAt: row.submitted_at,
  };
}

// "내가 이 세션에서 누구인지"는 탭 단위(sessionStorage)로 기억한다.
// localStorage(브라우저 단위)로 저장하면, 한 브라우저의 다른 탭에서 같은
// 초대 링크를 열었을 때(예: 링크 미리보기) 참가자 식별이 서로 덮어써진다.
export function rememberMyParticipant(sessionId: string, participantId: string) {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(
    `${MY_PARTICIPANT_PREFIX}${sessionId}`,
    participantId,
  );
}

export function getMyParticipantId(sessionId: string): string | null {
  if (!isBrowser()) return null;
  return window.sessionStorage.getItem(`${MY_PARTICIPANT_PREFIX}${sessionId}`);
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const db = requireSupabase();

  const { data: sessionRow, error: sessionError } = await db
    .from("sessions")
    .select("id, created_at, expires_at")
    .eq("id", sessionId)
    .maybeSingle<SessionRow>();

  if (sessionError || !sessionRow) return null;
  if (new Date(sessionRow.expires_at).getTime() < Date.now()) return null;

  const { data: participantRows, error: participantsError } = await db
    .from("participants")
    .select("id, session_id, role, nickname, answers, predictions, submitted_at")
    .eq("session_id", sessionId)
    .returns<ParticipantRow[]>();

  if (participantsError) return null;

  const participantA = participantRows?.find((p) => p.role === "A") ?? null;
  const participantB = participantRows?.find((p) => p.role === "B") ?? null;

  return {
    id: sessionRow.id,
    createdAt: sessionRow.created_at,
    expiresAt: sessionRow.expires_at,
    participantA: participantA ? mapParticipant(participantA) : null,
    participantB: participantB ? mapParticipant(participantB) : null,
  };
}

export async function createSession(
  nickname: string,
  answers: AnswerMap,
  predictions: PredictionMap,
): Promise<Session> {
  const db = requireSupabase();
  const sessionId = generateId();
  const participantId = generateId();
  const now = new Date().toISOString();

  const { error: sessionError } = await db
    .from("sessions")
    .insert({ id: sessionId });
  if (sessionError) {
    throw new Error(`세션 생성 실패: ${sessionError.message}`);
  }

  const { error: participantError } = await db.from("participants").insert({
    id: participantId,
    session_id: sessionId,
    role: "A",
    nickname,
    answers,
    predictions,
    submitted_at: now,
  });
  if (participantError) {
    throw new Error(`참가자 생성 실패: ${participantError.message}`);
  }

  rememberMyParticipant(sessionId, participantId);

  const session = await getSession(sessionId);
  if (!session) throw new Error("세션 생성 후 조회에 실패했습니다.");
  return session;
}

export type JoinResult =
  | { ok: true; session: Session }
  | { ok: false; error: "not_found" | "full" };

export async function joinSession(
  sessionId: string,
  nickname: string,
  answers: AnswerMap,
  predictions: PredictionMap,
): Promise<JoinResult> {
  const db = requireSupabase();

  const existing = await getSession(sessionId);
  if (!existing) return { ok: false, error: "not_found" };
  if (existing.participantB) return { ok: false, error: "full" };

  const participantId = generateId();
  const { error } = await db.from("participants").insert({
    id: participantId,
    session_id: sessionId,
    role: "B",
    nickname,
    answers,
    predictions,
    submitted_at: new Date().toISOString(),
  });

  if (error) {
    // unique(session_id, role) 위반 등 동시 참여 경합 상황
    return { ok: false, error: "full" };
  }

  rememberMyParticipant(sessionId, participantId);

  const updated = await getSession(sessionId);
  if (!updated) return { ok: false, error: "not_found" };
  return { ok: true, session: updated };
}

/** 세션 변경(친구 참여 등)을 감지해 콜백을 호출한다. cleanup 함수를 반환. */
export function subscribeToSession(
  sessionId: string,
  callback: (session: Session | null) => void,
): () => void {
  const db = requireSupabase();

  const refresh = () => {
    getSession(sessionId)
      .then(callback)
      .catch(() => {
        /* 일시적 네트워크 오류는 다음 이벤트/폴링에서 회복 */
      });
  };

  const channel = db
    .channel(`session-${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "participants",
        filter: `session_id=eq.${sessionId}`,
      },
      refresh,
    )
    .subscribe();

  // realtime 연결이 불안정한 네트워크를 대비한 폴링 폴백.
  const interval = isBrowser() ? window.setInterval(refresh, 4000) : null;

  return () => {
    db.removeChannel(channel);
    if (interval !== null) window.clearInterval(interval);
  };
}
