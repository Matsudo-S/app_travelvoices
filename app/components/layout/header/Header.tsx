'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import styles from './header.module.css'
import AuthClientButton from '../../../auth/AuthClientButton'
import Hamburger from '../../ui/hamburger/Hamburger'
import Drawer from '../../ui/drawer/Drawer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { NavigationItem } from '../../../types/navigation'
import { footerNavigationItems, footerSocialItems, footerSocialIcons } from '../footer/Footer'

const Header = () => {
  const [user, setUser] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ログイン後のナビゲーションアイテム
  const profileItem: NavigationItem = { href: '/dashboard', mainText: 'プロフィール', subText: 'Profile', showInDrawer: true }
  
  // ドロワーメニューに表示するアイテムをフィルタリング（Footerのナビゲーションデータを使用）
  const drawerNavigationItems = footerNavigationItems.filter(item => item.showInDrawer)
  const drawerSocialItems = footerSocialItems.filter(item => item.showInDrawer)
  
  // ログイン後のドロワーメニューアイテム
  const drawerProfileItems = user ? [profileItem] : []

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
      const scrollTop = window.scrollY
      const headerHeight = 80 // Headerの高さを想定
      setIsScrolled(scrollTop > headerHeight)
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
    <header className={`${styles.header} ${styles['is-active']} ${isScrolled ? styles['is-scrolled'] : ''}`}>
      <div className={styles['header__inner']}>
        <Link href="/" className={styles['header__logo']}>
          travel<br/>voices
        </Link>
        <div className={styles['header__nav-items']}>
          <div className={styles['header__auth-button']}>
            <AuthClientButton session={user} />
          </div>
          <Link href="/search" className={`${styles['header__link']} ${styles['header__link--underline']}`}>
            <span>
              <div className={styles['header__item-main']}>search</div>
              <div className={styles['header__item-sub']}>記事検索</div>
            </span>
          </Link>
          <Link href="/create-post" className={`${styles['header__link']} ${styles['header__link--underline']}`}>
            <span>
              <div className={styles['header__item-main']}>post</div>
              <div className={styles['header__item-sub']}>投稿</div>
            </span>
          </Link>
          <Link href="/about" className={`${styles['header__link']} ${styles['header__link--underline']}`}>
            <span>
              <div className={styles['header__item-main']}>about</div>
              <div className={styles['header__item-sub']}>使い方</div>
            </span>
          </Link>
          <Link href="/plan" className={`${styles['header__link']} ${styles['header__link--underline']}`}>
            <span>
              <div className={styles['header__item-main']}>price</div>
              <div className={styles['header__item-sub']}>料金</div>
            </span>
          </Link>
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
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} navigationItems={[...drawerNavigationItems, ...drawerProfileItems]} socialItems={drawerSocialItems} socialIcons={footerSocialIcons} />
    </header>
  )
}

export default Header