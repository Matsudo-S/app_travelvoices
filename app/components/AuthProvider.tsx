'use client'

import { useEffect } from 'react'
import { useAuthEffect } from '@/hooks/useAuthEffect'

export default function AuthProvider() {
  useEffect(() => {
    console.log('AuthProvider mounted')
    return () => {
      console.log('AuthProvider unmounted')
    }
  }, [])

  // Stripe顧客作成のフック stripe連携後にコメントアウト外す
  // useAuthEffect()
  
  return null // このコンポーネントは何もレンダリングしない
}
