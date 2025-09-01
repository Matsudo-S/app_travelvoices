import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import initStripe from "stripe";

export async function GET(
  req: NextRequest,
) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  

  
  const { data: stripe_customer_data, error: profileError } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer_data?.stripe_customer,
    return_url: "http://localhost:3000/dashboard",
  });

  return NextResponse.json({
    url: session.url,
  })
}
