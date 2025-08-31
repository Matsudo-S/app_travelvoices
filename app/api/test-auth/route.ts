import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  // 認証されたユーザーのセッションを取得
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  
  if (authError || !session) {
    return NextResponse.json({ 
      error: '認証が必要です',
      hasSession: false,
      authError: authError?.message 
    }, { status: 401 });
  }

  return NextResponse.json({ 
    message: '認証成功',
    hasSession: true,
    userId: session.user.id,
    email: session.user.email
  });
}
