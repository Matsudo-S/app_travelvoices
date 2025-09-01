import Link from 'next/link'
import React from 'react'
import styles from './header.module.css'
import AuthServerButton from '../../../auth/AuthServerButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();
  
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <div className={styles['header-left']}>
          <Link href="/" className={styles['header-logo']}>
            <span>レッスンアプリ</span>
          </Link>
        </div>
        <div className={styles['header-right']}>
          <Link href="/pricing" className={styles['header-link']}>
            <span>価格</span>
          </Link>
          {user?.session && (
            <Link href="/dashboard" className={styles['header-link']}>
              <span>ダッシュボード</span>
            </Link>
          )}
          <div>
            <AuthServerButton />
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header