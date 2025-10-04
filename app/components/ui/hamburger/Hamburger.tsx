'use client'

import React from 'react'
import styles from './hamburger.module.css'

interface HamburgerProps {
  isActive: boolean
  onClick: () => void
}

const Hamburger = ({ isActive, onClick }: HamburgerProps) => {
  return (
    <button 
      className={`${styles.hamburger} ${isActive ? styles['is-active'] : ''}`}
      onClick={onClick}
      aria-label={isActive ? "メニューを閉じる" : "メニューを開く"}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

export default Hamburger
