'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/toast/toast'
import styles from '@/assets/css/pages/login-button.module.css'

type OAuthProvider = 'google' | 'github'

type ProviderOption = {
  key: OAuthProvider
  label: string
  description: string
  icon: typeof faGoogle
  className: string
}

const OAUTH_PROVIDERS: ProviderOption[] = [
  {
    key: 'google',
    label: 'Googleでログイン',
    description: 'Gmailアカウントで素早くサインイン',
    icon: faGoogle,
    className: styles.optionGoogle,
  },
  {
    key: 'github',
    label: 'GitHubでログイン',
    description: '開発者アカウントでアクセス',
    icon: faGithub,
    className: styles.optionGithub,
  },
]

const LoginButton = () => {
  const supabase = createClientComponentClient()
  const { toast, showToast } = useToast()
  const [isSelecting, setIsSelecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProviderSelect = async (provider: OAuthProvider) => {
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
            <div className={styles.panelHeader}>
              <span className={styles.panelBadge}>Sign in</span>
              <div className={styles.title}>ログイン方法を選択</div>
              <p className={styles.subtitle}>
                普段お使いのアカウントを選んで、すぐに旅のコンテンツにアクセスできます。
              </p>
            </div>

            <div className={styles.options}>
              {OAUTH_PROVIDERS.map((provider) => (
                <button
                  key={provider.key}
                  type="button"
                  onClick={() => handleProviderSelect(provider.key)}
                  disabled={isProcessing}
                  className={`${styles.option} ${provider.className}`}
                >
                  <span className={styles.optionIconWrap}>
                    <FontAwesomeIcon icon={provider.icon} className={styles.optionIcon} />
                  </span>
                  <span className={styles.optionText}>
                    <span className={styles.optionTitle}>{provider.label}</span>
                    <span className={styles.optionDescription}>{provider.description}</span>
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className={styles.optionArrow} />
                </button>
              ))}

              <button
                type="button"
                onClick={handleEmailSignIn}
                className={`${styles.option} ${styles.optionEmail}`}
              >
                <span className={styles.optionIconWrap}>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.optionIcon} />
                </span>
                <span className={styles.optionText}>
                  <span className={styles.optionTitle}>メールアドレスでログイン</span>
                  <span className={styles.optionDescription}>ワンタイムリンクをメールでお送りします</span>
                </span>
                <FontAwesomeIcon icon={faChevronRight} className={styles.optionArrow} />
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
