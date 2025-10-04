'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './drawer.module.css'
import { NavigationItem } from '../../../types/navigation'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: NavigationItem[]
}

const Drawer = ({ isOpen, onClose, navigationItems }: DrawerProps) => {
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

  return (
    <div className={`${styles.drawerMenu} ${isOpen ? styles['is-open'] : ''}`}>
      <div className={styles.drawerMenu__inner}>
        <nav className={styles.drawerMenu__lists}>
          {navigationItems.map((item, index) => (
            <div key={item.href} className={styles.drawer__menuList}>
              <Link href={item.href} onClick={handleLinkClick} className={styles.drawer__link}>
                <span className={styles.drawer__text}>{item.mainText}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Drawer
