import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Supabaseクライアントの初期化
export const createSupabaseClient = () => {
  return createServerComponentClient({ cookies });
};

// データベース接続のテスト
export const testConnection = async () => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("lesson").select("count").limit(1);
    
    if (error) {
      throw new Error(`データベース接続エラー: ${error.message}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("データベース接続テストエラー:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
