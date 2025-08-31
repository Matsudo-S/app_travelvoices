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

  useAuthEffect()
  
  return null // このコンポーネントは何もレンダリングしない
}
