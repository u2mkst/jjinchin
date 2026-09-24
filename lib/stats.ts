import { supabase } from "@/lib/supabase";

/**
 * 완료된(친구까지 참여한) 세션 수. 랜딩 페이지 소셜프루프용.
 * Supabase 접근이 실패해도 페이지 렌더링을 막지 않도록 null로 폴백한다.
 */
export async function getCompletedPairCount(): Promise<number | null> {
  if (!supabase) return null;
  try {
    const { count, error } = await supabase
      .from("participants")
      .select("*", { count: "exact", head: true })
      .eq("role", "B");
    if (error) return null;
    return count ?? null;
  } catch {
    return null;
  }
}
