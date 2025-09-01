import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import initStripe from "stripe";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;
  const signature = req.headers.get("Stripe-Signature");
  
  const reqBuffer = Buffer.from(await req.arrayBuffer());
  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature!, endpointSecret);

    switch (event.type) {
      // createするとき
      case "customer.subscription.created":
        const subscription = event.data.object;
        
        await supabase.from("profile").update({
          is_subscription: true,
          // interval: monthly, yearly, etc
          interval: subscription.items.data[0].plan.interval,
        }).eq("stripe_customer", event.data.object.customer as string);
        break;
      // updateするとき
      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object;
        
        // dashboardからユーザーがサブスクリプションを解約するとき、理由をせんたくすると
        // updateになってしまうので、条件分岐でcanceledにする
        if (subscriptionUpdated.status === "canceled") {
          await supabase.from("profile").update({
            is_subscription: false,
            interval: null,
          }).eq("stripe_customer", event.data.object.customer as string);
        } else {
          await supabase.from("profile").update({
            is_subscription: true,
            interval: subscriptionUpdated.items.data[0].plan.interval,
          }).eq("stripe_customer", event.data.object.customer as string);
        }
        
        break;
      // deleteするとき
      case "customer.subscription.deleted":
        
        // データベースからデータを削除
        await supabase.from("profile").update({
          is_subscription: false,
          interval: null,
        }).eq("stripe_customer", event.data.object.customer as string);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

}