import { generateId } from "@/lib/id";
import type {
  AnswerMap,
  Participant,
  PredictionMap,
  Session,
} from "@/lib/types";

/**
 * MVP 데이터 저장소: localStorage + BroadcastChannel 기반 로컬 구현.
 *
 * Supabase 프로젝트가 준비되면 이 파일의 함수 시그니처를 그대로 유지한 채
 * `supabase/schema.sql`의 테이블을 사용하는 구현으로 교체하면 된다
 * (세션/참가자 CRUD + realtime 구독 부분만 바뀜).
 */

const SESSION_PREFIX = "jjinchin:session:";
const MY_PARTICIPANT_PREFIX = "jjinchin:me:";
const EXPIRES_MS = 7 * 24 * 60 * 60 * 1000; // 7일 (F11)
const CHANNEL_NAME = "jjinchin-sync";

function isBrowser() {
  return typeof window !== "undefined";
}

function sessionKey(id: string) {
  return `${SESSION_PREFIX}${id}`;
}

function readSession(id: string): Session | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(sessionKey(id));
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as Session;
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      window.localStorage.removeItem(sessionKey(id));
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

let channel: BroadcastChannel | null = null;
function getChannel(): BroadcastChannel | null {
  if (!isBrowser() || typeof BroadcastChannel === "undefined") return null;
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME);
  return channel;
}

function writeSession(session: Session) {
  if (!isBrowser()) return;
  window.localStorage.setItem(
    sessionKey(session.id),
    JSON.stringify(session),
  );
  getChannel()?.postMessage({ sessionId: session.id });
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

export function createSession(
  nickname: string,
  answers: AnswerMap,
  predictions: PredictionMap,
): Session {
  const now = new Date();
  const id = generateId();
  const participant: Participant = {
    id: generateId(),
    sessionId: id,
    role: "A",
    nickname,
    answers,
    predictions,
    submittedAt: now.toISOString(),
  };
  const session: Session = {
    id,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + EXPIRES_MS).toISOString(),
    participantA: participant,
    participantB: null,
  };
  writeSession(session);
  rememberMyParticipant(id, participant.id);
  return session;
}

export type JoinResult =
  | { ok: true; session: Session }
  | { ok: false; error: "not_found" | "full" };

export function joinSession(
  sessionId: string,
  nickname: string,
  answers: AnswerMap,
  predictions: PredictionMap,
): JoinResult {
  const session = readSession(sessionId);
  if (!session) return { ok: false, error: "not_found" };
  if (session.participantB) return { ok: false, error: "full" };

  const participant: Participant = {
    id: generateId(),
    sessionId,
    role: "B",
    nickname,
    answers,
    predictions,
    submittedAt: new Date().toISOString(),
  };
  const updated: Session = { ...session, participantB: participant };
  writeSession(updated);
  rememberMyParticipant(sessionId, participant.id);
  return { ok: true, session: updated };
}

export function getSession(sessionId: string): Session | null {
  return readSession(sessionId);
}

/** 세션 변경(친구 참여 등)을 감지해 콜백을 호출한다. cleanup 함수를 반환. */
export function subscribeToSession(
  sessionId: string,
  callback: (session: Session | null) => void,
): () => void {
  if (!isBrowser()) return () => {};

  const handleUpdate = () => callback(readSession(sessionId));

  const ch = getChannel();
  const onMessage = (event: MessageEvent) => {
    if (event.data?.sessionId === sessionId) handleUpdate();
  };
  ch?.addEventListener("message", onMessage);

  const onStorage = (event: StorageEvent) => {
    if (event.key === sessionKey(sessionId)) handleUpdate();
  };
  window.addEventListener("storage", onStorage);

  // BroadcastChannel/storage 이벤트는 다른 탭에서만 발생하므로,
  // 동일 탭(같은 브라우저 세션)에서의 변경 감지를 위한 폴링 폴백.
  const interval = window.setInterval(handleUpdate, 1500);

  return () => {
    ch?.removeEventListener("message", onMessage);
    window.removeEventListener("storage", onStorage);
    window.clearInterval(interval);
  };
}
