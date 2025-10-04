import React from 'react'
import { createServerComponentClient, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../lib/database.types'
import styles from './dashboard.module.css'
import SubscriptionManagementButton from '../components/layout/checkout/SubscriptionManagementButton'

const getProfileData = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();
  return profile;
}


const Dashboard = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const profile = await getProfileData(supabase, user?.id as string);

  return (
    <main className="page-container">
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>ユーザー管理ダッシュボード</h1>
        </div>
        
        <div className={styles.dashboardContent}>
          <div className={styles.subscriptionInfo}>
            <div className={`${styles.subscriptionStatus} ${profile?.is_subscription ? styles.active : styles.inactive}`}>
              {profile?.is_subscription 
                ? `プラン契約中: ${profile?.interval} プラン` 
                : 'プラン契約中: なし'}
            </div>
            <SubscriptionManagementButton />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard