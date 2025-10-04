import styles from "./pricing.module.css";
import Stripe from "stripe";
import { Plan } from "../types";
import { createServerComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../lib/database.types";
import SubscriptionButton from "@/components/layout/checkout/SubscriptionButton";
import LoginButton from "../pricing/LoginButton";
import Link from "next/link";

const getAllPlans = async (): Promise<Plan[]> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { data: plansList } = await stripe.plans.list();

  const plans = await Promise.all(
    plansList.map(async (plan) => {
      const product = await stripe.products.retrieve(plan.product as string);
      
      return {
        id: plan.id,
        name: product.name,
        price: plan.amount?.toString() || null,
        currency: plan.currency,
        interval: plan.interval,
      }
    })
  )
  // 価格安い順にソート
  const sortedPlans = plans.sort((a, b) => parseInt(a.price as string) - parseInt(b.price as string));
  
  return sortedPlans;
}

const getProfileData = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();
  return profile;
}

const PricingPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session: userSession } } = await supabase.auth.getSession();
  
  const [profile, plans] = await Promise.all([
    getProfileData(supabase, userSession?.user?.id as string),
    getAllPlans()
  ]);
  
  
  

  console.log(profile);
  const showSubscriptionButton = !!userSession && !profile?.is_subscription;
  const showCreateAccountButton = !userSession;
  const showManageSubscriptionButton = !!userSession && profile?.is_subscription;
  

  return (
    <main className="page-container">
      <div className={styles['pricing-container']}>
        <div className={styles['pricing-grid']}>
          {plans.map((plan: Plan) => (
            <div key={plan.id} className={styles['pricing-card']}>
              <h2 className={styles['pricing-title']}>
                {plan.name} プラン
              </h2>
              <p className={styles['pricing-subtitle']}>
                {plan.interval}
              </p>
              <p className={styles['pricing-price']}>
                {plan.price}円 / {plan.interval}
              </p>
              <button className={styles['pricing-button']}>
                {showCreateAccountButton && <LoginButton />}
                {showSubscriptionButton && <SubscriptionButton planId={plan.id}>サブスクリプション契約をする</SubscriptionButton>}
                {showManageSubscriptionButton && (
                  <Link href="/dashboard">サブスクリプションを管理する</Link>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default PricingPage;