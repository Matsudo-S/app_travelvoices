// authButtonだけはevent handlerが使えない関係でclientコンポーネントに変えとく
'use client'
import React from 'react'
import { Session } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/toast/toast'

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast, showToast } = useToast();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // 変数にすることでlocalhostでも公開URL上でも対応できる
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    showToast('ログインしました', 'success');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    showToast('ログアウトしました', 'info');
  };

  return (
    <>
    {session ? (
      <Button onClick={handleSignOut}>ログアウト</Button>
    ) : (
      <Button onClick={handleSignIn}>ログイン</Button>
    )}
    <Toast 
      message={toast.message} 
      type={toast.type} 
      show={toast.show} 
    />
    </>
  )
}

export default AuthClientButton