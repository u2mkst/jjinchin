import type { Metadata } from "next";
import { SessionView } from "./SessionView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const title = "찐친력 — 우리 우정 성적표";
  const description = "친구가 나를 초대했어요! 같은 질문에 답하고 찐친력 점수를 확인해보세요.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/s/${id}`,
    },
  };
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SessionView id={id} />;
}
