"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { NicknameForm } from "@/components/NicknameForm";
import { QuestionFlow } from "@/components/QuestionFlow";
import { ResultCard } from "@/components/ResultCard";
import { ShareLinks } from "@/components/ShareLinks";
import { QUESTIONS } from "@/data/questions";
import { computeResult } from "@/lib/scoring";
import {
  getMyParticipantId,
  getSession,
  joinSession,
  subscribeToSession,
} from "@/lib/store";
import type { AnswerMap, PredictionMap, Session } from "@/lib/types";

type Status =
  | "loading"
  | "not_found"
  | "invite_wait"
  | "join"
  | "joining"
  | "full"
  | "analyzing"
  | "result"
  | "error";

export function SessionView({ id }: { id: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [nickname, setNickname] = useState<string | null>(null);

  function resolveStatus(current: Session | null) {
    setSession(current);
    if (!current) {
      setStatus("not_found");
      return;
    }
    const myId = getMyParticipantId(id);
    const iAmA = myId && current.participantA?.id === myId;
    const iAmB = myId && current.participantB?.id === myId;

    if (iAmA) {
      setStatus(current.participantB ? "analyzing" : "invite_wait");
    } else if (iAmB) {
      setStatus("analyzing");
    } else if (!current.participantB) {
      setStatus("join");
    } else {
      setStatus("full");
    }
  }

  useEffect(() => {
    let cancelled = false;

    getSession(id)
      .then((current) => {
        if (!cancelled) resolveStatus(current);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    let unsubscribe = () => {};
    try {
      unsubscribe = subscribeToSession(id, (updated) => {
        setSession(updated);
        // 대기 중일 때만 자동으로 상태를 갱신 (참여 흐름 도중엔 방해하지 않음)
        setStatus((prevStatus) => {
          if (prevStatus !== "invite_wait") return prevStatus;
          if (updated?.participantB) return "analyzing";
          return prevStatus;
        });
      });
    } catch {
      // Supabase 미설정 등 구독 자체가 실패한 경우 (외부 시스템 연결 실패를 즉시 반영)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("error");
    }

    return () => {
      cancelled = true;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (status !== "analyzing") return;
    const timer = setTimeout(() => setStatus("result"), 2400);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleJoinComplete(
    answers: AnswerMap,
    predictions: PredictionMap,
  ) {
    if (!nickname) return;
    setStatus("joining");
    try {
      const outcome = await joinSession(id, nickname, answers, predictions);
      if (!outcome.ok) {
        setStatus(outcome.error === "full" ? "full" : "not_found");
        return;
      }
      setSession(outcome.session);
      setStatus("analyzing");
    } catch {
      setStatus("error");
    }
  }

  if (status === "loading") {
    return <div className="flex flex-1 items-center justify-center" />;
  }

  if (status === "error") {
    return (
      <ErrorScreen message="일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요." />
    );
  }

  if (status === "not_found") {
    return <ErrorScreen message="세션을 찾을 수 없거나 만료됐어요 (7일 후 자동 삭제)." />;
  }

  if (status === "full") {
    return (
      <ErrorScreen message="이미 두 명이 참여를 마친 링크예요. 새로운 테스트를 시작해보세요!" />
    );
  }

  if (status === "invite_wait" && session) {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/s/${id}`
        : "";
    return (
      <div className="flex flex-1 flex-col gap-6">
        <header className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand uppercase">
            초대 링크 준비 완료
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            {session.participantA?.nickname}님의 결과가 잠겨있어요
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            친구가 링크로 들어와서 같은 질문에 답하면 결과가 열려요
          </p>
        </header>

        <div className="paper-card relative flex flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-6 text-center">
          <div className="pointer-events-none select-none blur-md">
            <p className="text-6xl font-black text-brand">87점</p>
            <p className="mt-2 text-lg font-bold">겉바속촉 이해심 만렙</p>
          </div>
          <p className="absolute inset-x-6 bottom-6 text-sm font-semibold text-foreground/70">
            🔒 친구가 참여하면 결과가 공개돼요
          </p>
        </div>

        <ShareLinks
          url={shareUrl}
          text="우리 찐친력 몇 점인지 재보자ㅋㅋ 나 이미 했어"
        />
      </div>
    );
  }

  if ((status === "join" || status === "joining") && session) {
    if (!nickname) {
      return (
        <NicknameForm
          title={`${session.participantA?.nickname}님이 초대했어요`}
          description="같은 질문에 답하면 둘의 찐친력이 공개돼요"
          submitLabel="질문 시작하기"
          onSubmit={setNickname}
        />
      );
    }
    if (status === "joining") {
      return (
        <div className="paper-card flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl p-8 text-center">
          <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-brand/20 border-t-brand" />
          <p className="text-sm font-semibold text-foreground/70">
            답변을 제출하는 중...
          </p>
        </div>
      );
    }
    return (
      <QuestionFlow
        questions={QUESTIONS}
        nickname={nickname}
        onComplete={handleJoinComplete}
      />
    );
  }

  if (status === "analyzing") {
    return <LoadingAnalysis />;
  }

  if (status === "result" && session?.participantA && session.participantB) {
    const result = computeResult(session.participantA, session.participantB);
    return (
      <div className="flex flex-1 flex-col gap-6">
        <ResultCard
          a={session.participantA}
          b={session.participantB}
          result={result}
        />
        <ShareLinks
          url={typeof window !== "undefined" ? window.location.href : ""}
          text={`우리 찐친력 ${result.score}점 나왔어! 너도 확인해봐`}
        />
        <Link
          href="/start"
          className="text-center text-sm font-semibold text-foreground/50 underline"
        >
          다른 친구와 또 하기
        </Link>
      </div>
    );
  }

  return <ErrorScreen message="문제가 발생했어요. 다시 시도해주세요." />;
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="text-base text-foreground/70">{message}</p>
      <Link
        href="/start"
        className="rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white"
      >
        새로 시작하기
      </Link>
    </div>
  );
}
