'use client'
import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/toast/toast'

const LoginButton = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast, showToast } = useToast();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    showToast('ログインしました', 'success');
  };

  return (
    <>
      <span onClick={handleSignIn}>ログインする</span>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        show={toast.show} 
      />
    </>
  )
}

export default LoginButton
