'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './drawer.module.css'
import { NavigationItem } from '../../../types/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: NavigationItem[]
  socialItems?: NavigationItem[]
  socialIcons?: Record<string, { icon: any; color: string }>
}

const Drawer = ({ isOpen, onClose, navigationItems, socialItems = [], socialIcons = {} }: DrawerProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 400) // アニメーション完了後に非表示
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, onClose])

  const handleLinkClick = () => {
    // リンクをクリックしたらドロワーメニューを閉じる
    onClose()
  }

  // カテゴリごとにナビゲーションアイテムを分類
  const serviceItems = navigationItems.filter(item => 
    ['/about', '/search', '/create-post', '/price'].includes(item.href)
  )
  const accountItems = navigationItems.filter(item => 
    ['/mypage', '/404'].includes(item.href)
  )
  const supportItems = navigationItems.filter(item => 
    ['/contact', '/faq', '/privacy', '/terms'].includes(item.href)
  )

  return (
    <div className={`${styles.drawerMenu} ${isOpen ? styles['is-open'] : ''}`}>
      <div className={styles.drawerMenu__inner}>
        <nav className={styles.drawerMenu__lists}>
          {/* サービスカテゴリ */}
          <div className={styles.drawer__category}>
            <h3 className={styles.drawer__categoryTitle}>サービス</h3>
            {serviceItems.map((item, index) => (
              <div key={item.href} className={styles.drawer__menuList}>
                <Link href={item.href} onClick={handleLinkClick} className={styles.drawer__link}>
                  <span className={styles.drawer__text}>{item.mainText}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* アカウントカテゴリ */}
          <div className={styles.drawer__category}>
            <h3 className={styles.drawer__categoryTitle}>アカウント</h3>
            {accountItems.map((item, index) => (
              <div key={item.href} className={styles.drawer__menuList}>
                <Link href={item.href} onClick={handleLinkClick} className={styles.drawer__link}>
                  <span className={styles.drawer__text}>{item.mainText}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* SNSカテゴリ */}
          <div className={styles.drawer__category}>
            <h3 className={styles.drawer__categoryTitle}>SNS</h3>
            {socialItems.map((item, index) => {
              // URLからアイコンを特定
              let iconKey = 'instagram'
              if (item.href.includes('x.com')) iconKey = 'x'
              if (item.href.includes('line.me')) iconKey = 'line'
              
              return (
                <div key={item.href} className={styles.drawer__menuList}>
                  <Link href={item.href} onClick={handleLinkClick} className={styles.drawer__link} target="_blank" rel="noopener noreferrer">
                    <div className={styles.drawer__socialItem}>
                      <FontAwesomeIcon icon={socialIcons[iconKey]} className={styles.drawer__socialIcon} />
                      <span className={styles.drawer__text}>{item.mainText}</span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* サポートカテゴリ */}
          <div className={styles.drawer__category}>
            <h3 className={styles.drawer__categoryTitle}>サポート</h3>
            {supportItems.map((item, index) => (
              <div key={item.href} className={styles.drawer__menuList}>
                <Link href={item.href} onClick={handleLinkClick} className={styles.drawer__link}>
                  <span className={styles.drawer__text}>{item.mainText}</span>
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Drawer
