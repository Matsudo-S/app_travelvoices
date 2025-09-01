'use client'

import { loadStripe } from "@stripe/stripe-js";

const SubscriptionButton = ({ planId, children }: { planId: string; children: React.ReactNode }) => {
  
  const processSubscription = async () => {
    const response = await fetch(`/api/subscription/${planId}`);
    const data = await response.json();
    
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  }

  return (
    <span onClick={async () => processSubscription()}>
      {children}
    </span>
  )
}

export default SubscriptionButton