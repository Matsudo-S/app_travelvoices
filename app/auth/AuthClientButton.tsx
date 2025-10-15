'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/toast/toast'
import LoginButton from '@/components/ui/login-button/LoginButton'
import { Button } from '@/components/ui/button'
import styles from '@/assets/css/pages/login-button.module.css'

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast, showToast } = useToast()
  const [hasSession, setHasSession] = useState<boolean>(!!session)

  useEffect(() => {
    setHasSession(!!session)
  }, [session])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setHasSession(false)
      showToast('ログアウトしました', 'info')
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('[AuthClientButton] signOut failed', error)
      showToast('ログアウトに失敗しました', 'error')
    }
  }

  return (
    <>
      {hasSession ? (
        <Button onClick={handleSignOut} className={styles.logoutButton}>
          ログアウト
        </Button>
      ) : (
        <LoginButton />
      )}
      <Toast message={toast.message} type={toast.type} show={toast.show} />
    </>
  )
}

export default AuthClientButton