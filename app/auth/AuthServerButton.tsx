import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthClientButton from './AuthClientButton'

const AuthServerButton = async () => {

  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  return (
    <AuthClientButton session={session} />
  )
}

export default AuthServerButton