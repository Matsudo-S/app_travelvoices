import { createSupabaseClient } from "./db";
import { Lesson, ApiResponse, PaginationParams, PaginatedResponse } from "../types";

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

// ページネーション付きでレッスンを取得する関数
export const getLessonsWithPagination = async (
  params: PaginationParams
): Promise<PaginatedResponse<Lesson>> => {
  try {
    const supabase = createSupabaseClient();
    const { page, limit } = params;
    const offset = (page - 1) * limit;

    const { data: lessons, error, count } = await supabase
      .from("lesson")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("レッスン取得エラー:", error);
      throw new Error(`レッスンの取得に失敗しました: ${error.message}`);
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: lessons || [],
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    console.error("予期しないエラー:", error);
    throw new Error("レッスンの取得中にエラーが発生しました");
  }
};
