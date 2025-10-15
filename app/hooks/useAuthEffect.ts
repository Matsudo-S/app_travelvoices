import { useEffect, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// グローバルなフラグで重複実行を防止
let globalHasCreatedStripeCustomer = false
let globalIsProcessing = false
let effectCallCount = 0

export const useAuthEffect = () => {
  const supabase = createClientComponentClient()
  const effectId = useRef(++effectCallCount)
  const hasCreatedStripeCustomer = useRef(false)

  useEffect(() => {
    console.log(`useAuthEffect ${effectId.current} mounted`)
    
    const createStripeCustomer = async () => {
      // 既に処理中または作成済みの場合はスキップ
      if (globalIsProcessing || globalHasCreatedStripeCustomer || hasCreatedStripeCustomer.current) {
        console.log('Stripe customer creation skipped - already processed')
        return
      }

      try {
        globalIsProcessing = true
        
        // 現在のセッションを取得
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError || !session?.user) {
          console.log('No session found, skipping Stripe customer creation')
          return
        }

        // 既にStripe顧客IDが設定されているかチェック
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('stripe_customer')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
          return
        }

        // 既にStripe顧客IDが存在する場合はスキップ
        if (profile?.stripe_customer) {
          console.log('Stripe customer already exists:', profile.stripe_customer)
          globalHasCreatedStripeCustomer = true
          hasCreatedStripeCustomer.current = true
          return
        }

        // Stripe顧客を作成
        const response = await fetch('/api/create-stripe-customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            record: {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email,
            },
          }),
        })

        if (response.ok) {
          console.log('Stripe customer created successfully')
          globalHasCreatedStripeCustomer = true
          hasCreatedStripeCustomer.current = true
        } else {
          console.error('Failed to create Stripe customer')
        }
      } catch (error) {
        console.error('Error in createStripeCustomer:', error)
      } finally {
        globalIsProcessing = false
      }
    }

    // 少し遅延を入れて実行（セッションの安定化を待つ）
    const timeoutId = setTimeout(createStripeCustomer, 1000)

    return () => {
      console.log(`useAuthEffect ${effectId.current} unmounted`)
      clearTimeout(timeoutId)
    }
  }, [supabase.auth]) // supabase.authを依存配列に追加
}
