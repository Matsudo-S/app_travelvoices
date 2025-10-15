'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/toast/toast'
import styles from '@/assets/css/pages/login-button.module.css'

const OAUTH_PROVIDERS = [
  { key: 'google', label: 'Googleでログイン' },
  { key: 'github', label: 'GitHubでログイン' },
]

const LoginButton = () => {
  const supabase = createClientComponentClient()
  const { toast, showToast } = useToast()
  const [isSelecting, setIsSelecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProviderSelect = async (provider: 'google' | 'github') => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // 変数にすることでlocalhostでも公開URL上でも対応できる
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      })
      showToast('サインイン画面にリダイレクトします', 'info')
    } catch (error) {
      console.error('[LoginButton] OAuth sign-in failed', error)
      showToast('ログインに失敗しました', 'error')
      setIsProcessing(false)
    }
  }

  const handleEmailSignIn = async () => {
    const email = prompt('ログイン用のメールアドレスを入力してください')
    if (!email) return

    try {
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      showToast('ログインリンクをメールで送信しました', 'success')
      setIsSelecting(false)
    } catch (error) {
      console.error('[LoginButton] Email sign-in failed', error)
      showToast('メール送信に失敗しました', 'error')
    }
  }

  const handleCloseSelection = () => {
    if (isProcessing) return
    setIsSelecting(false)
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseSelection()
    }
  }

  return (
    <>
      <Button className={styles.triggerButton} onClick={() => setIsSelecting(true)}>
        ログイン
      </Button>

      {isSelecting && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.panel}>
            <div className={styles.title}>ログイン方法を選択</div>

            <div className={styles.options}>
              {OAUTH_PROVIDERS.map((provider) => (
                <button
                  key={provider.key}
                  type="button"
                  onClick={() => handleProviderSelect(provider.key as 'google' | 'github')}
                  disabled={isProcessing}
                  className={styles.option}
                >
                  {provider.label}
                </button>
              ))}

              <button type="button" onClick={handleEmailSignIn} className={styles.option}>
                メールアドレスでログイン
              </button>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={handleCloseSelection} className={styles.cancel}>
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} show={toast.show} />
    </>
  )
}

export default LoginButton
