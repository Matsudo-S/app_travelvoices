import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// レッスンの型定義
export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

// Supabaseクライアントの初期化
const createSupabaseClient = () => {
  return createServerComponentClient({ cookies });
};

// レッスンを取得する関数（エラーハンドリング付き）
export const getAllLessons = async (): Promise<Lesson[]> => {
  try {
    const supabase = createSupabaseClient();
    const { data: lessons, error } = await supabase
      .from("lesson")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("レッスン取得エラー:", error);
      throw new Error(`レッスンの取得に失敗しました: ${error.message}`);
    }

    return lessons || [];
  } catch (error) {
    console.error("予期しないエラー:", error);
    throw new Error("レッスンの取得中にエラーが発生しました");
  }
};

// 特定のレッスンを取得する関数
export const getLessonById = async (id: string): Promise<Lesson | null> => {
  try {
    const supabase = createSupabaseClient();
    const { data: lesson, error } = await supabase
      .from("lesson")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("レッスン取得エラー:", error);
      throw new Error(`レッスンの取得に失敗しました: ${error.message}`);
    }

    return lesson;
  } catch (error) {
    console.error("予期しないエラー:", error);
    throw new Error("レッスンの取得中にエラーが発生しました");
  }
};
