import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: NextRequest) {
  // stripeとsupabaseの初期化処理
  const supabase = createRouteHandlerClient({ cookies });
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  
  // リクエストボディの取得
  const data = await req.json();
  const { id, email, name } = data.record;

  try {
    // 既にStripe顧客IDが設定されているかチェック
    const { data: existingProfile, error: profileError } = await supabase
      .from("profile")
      .select("stripe_customer")
      .eq("id", id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      return NextResponse.json({ error: "Profile fetch error" }, { status: 500 });
    }

    // 既にStripe顧客IDが存在する場合は既存のIDを返す
    if (existingProfile?.stripe_customer) {
      return NextResponse.json({
        message: `Stripe customer already exists: ${existingProfile.stripe_customer}`,
        customer: { id: existingProfile.stripe_customer },
        existing: true
      });
    }

    // 同じemailで既存のStripe顧客を検索
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      const existingCustomer = existingCustomers.data[0];
      
      // 既存の顧客IDをprofileテーブルに保存
      await supabase
        .from("profile")
        .update({
          stripe_customer: existingCustomer.id,
        })
        .eq("id", id);

      return NextResponse.json({
        message: `Existing Stripe customer found: ${existingCustomer.id}`,
        customer: existingCustomer,
        existing: true
      });
    }

    // 新しいStripe顧客を作成
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: {
        id: id,
      },
    });

    // supabaseでprofile tableの更新
    await supabase
      .from("profile")
      .update({
        stripe_customer: customer.id,
      })
      .eq("id", id);

    // customerIDの情報を返す
    return NextResponse.json({
      message: `Stripe customer created successfully: ${customer.id}`,
      customer: customer,
      existing: false
    });
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return NextResponse.json({ error: "Failed to create Stripe customer" }, { status: 500 });
  }
}