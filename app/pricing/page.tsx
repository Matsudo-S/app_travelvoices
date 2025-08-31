import styles from "./pricing.module.css";
import Stripe from "stripe";

const getAllPlans = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { data: plansList } = await stripe.plans.list();

  const plans = await Promise.all(
    plansList.map(async (plan) => {
      const product = await stripe.products.retrieve(plan.product as string);
      
      return {
        id: plan.id,
        name: product.name,
        price: plan.amount,
        currency: plan.currency,
        interval: plan.interval,
        interval_count: plan.interval_count,
        product: product.id,
      }
    })
  )
  // 価格安い順にソート
  const sortedPlans = plans.sort((a: any, b: any) => a.price - b.price);
  
  return sortedPlans;
}

const PricingPage = async () => {
  const plans = await getAllPlans();
  console.log(plans);
  
  return (
    <div className={styles['pricing-container']}>
      <div className={styles['pricing-grid']}>
        {plans.map((plan: any) => (
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
              サブスクリプション契約をする
            </button>
          </div>
        ))}
      </div>
    </div> 
  )
}

export default PricingPage;