import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import initStripe from "stripe";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ priceId: string }> }
) {
  const resolvedParams = await params;
  console.log('API called with priceId:', resolvedParams.priceId);
  
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  console.log('User:', user?.id);

  if (!user) {
    console.log('User not found');
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { data: stripe_customer_data, error: profileError } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  console.log('Profile data:', stripe_customer_data);
  console.log('Profile error:', profileError);

  if (profileError) {
    console.log('Profile error:', profileError);
    return NextResponse.json({ error: "Profile error: " + profileError.message }, { status: 500 });
  }

  if (!stripe_customer_data) {
    console.log('Stripe customer not found');
    return NextResponse.json({ error: "Stripe customer not found" }, { status: 404 });
  }

  console.log('Stripe customer:', stripe_customer_data.stripe_customer);

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  console.log('Stripe initialized');
  
  // チェックアウトセッションの作成オプション
  const sessionOptions: any = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{
      price: resolvedParams.priceId, quantity: 1,
    }],
    success_url: `http://localhost:3000/payment/success`,
    cancel_url: `http://localhost:3000/payment/cancelled`,
  };

  // 顧客IDが存在する場合は追加
  if (stripe_customer_data.stripe_customer) {
    sessionOptions.customer = stripe_customer_data.stripe_customer;
  } else {
    // 顧客IDが存在しない場合はemailを追加
    sessionOptions.customer_email = user.email;
  }
  
  const session = await stripe.checkout.sessions.create(sessionOptions);

  console.log('Session created:', session.id);

  return NextResponse.json({
    id: session.id,
  })
}
