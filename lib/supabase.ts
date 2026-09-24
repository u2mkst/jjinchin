import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Supabase 프로젝트 연결 전에는 항상 null.
 * 계획서 15번 항목(Supabase 계정 생성)이 완료되고 .env에 값이 채워지면
 * `lib/store.ts`를 이 클라이언트를 사용하는 구현으로 교체한다.
 * 테이블 스키마는 supabase/schema.sql 참고.
 */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = supabase !== null;
