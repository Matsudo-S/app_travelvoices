'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import styles from './header.module.css'
import AuthClientButton from '../../../auth/AuthClientButton'
import Hamburger from '../../ui/hamburger/Hamburger'
import Drawer from '../../ui/drawer/Drawer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { NavigationItem } from '../../../types/navigation'

const Header = () => {
  const [user, setUser] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  // ナビゲーションデータの定義
  const navigationItems: NavigationItem[] = [
    { href: '/search', mainText: 'search', subText: '記事検索', showInDrawer: true },
    { href: '/post', mainText: 'post', subText: '投稿', showInDrawer: true },
    { href: '/about', mainText: 'about', subText: '使い方', showInDrawer: true },
    { href: '/plan', mainText: 'plan', subText: '料金', showInDrawer: true }
  ]

  // ログイン後のナビゲーションアイテム
  const profileItem: NavigationItem = { href: '/dashboard', mainText: 'プロフィール', subText: 'Profile', showInDrawer: true }

  // ドロワーメニューに表示するアイテムをフィルタリング
  const drawerNavigationItems = navigationItems.filter(item => item.showInDrawer)
  
  // ログイン後のドロワーメニューアイテム
  const drawerProfileItems = user?.session ? [profileItem] : []

  useEffect(() => {
    const supabase = createClientComponentClient()
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const headerHeight = window.innerWidth >= 768 ? 90 : 80
      const mvHeight = viewportHeight - headerHeight
      
      // MVコンポーネントの高さ分スクロールしたら固定表示
      if (scrollY >= mvHeight) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    // ドロワーメニューの開閉状態を管理
    const body = document.body
    if (!isDrawerOpen) {
      body.classList.add('is-drawer-active')
    } else {
      body.classList.remove('is-drawer-active')
    }
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    document.body.classList.remove('is-drawer-active')
  }
  
  return (
    <header className={`${styles.header} ${styles['is-active']} ${isFixed ? styles['is-fixed'] : ''}`}>
      <div className={styles['header__inner']}>
        <Link href="/" className={styles['header__logo']}>
          travel<br/>voices
        </Link>
        <div className={styles['header__nav-items']}>
          <div className={styles['header__auth-button']}>
            <AuthClientButton session={user} />
          </div>
          {navigationItems.map((item, index) => (
            <Link key={item.href} href={item.href} className={`${styles['header__link']} ${styles['header__link--underline']}`}>
              <span>
                <div className={styles['header__item-main']}>{item.mainText}</div>
                <div className={styles['header__item-sub']}>{item.subText}</div>
              </span>
            </Link>
          ))}
          {user?.session && (
            <Link href={profileItem.href} className={`${styles['header__link']} ${styles['header__link--underline']}`}>
              <span>
                <div className={styles['header__item-main']}>{profileItem.mainText}</div>
                <div className={styles['header__item-sub']}>{profileItem.subText}</div>
              </span>
            </Link>
          )}
            <div className={`${styles['header__hamburger']} ${isDrawerOpen ? styles['is-active'] : ''}`}>
              <Hamburger isActive={isDrawerOpen} onClick={toggleDrawer} />
            </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} navigationItems={[...drawerNavigationItems, ...drawerProfileItems]} />
    </header>
  )
}

export default Header