'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './fv-animation.module.css'

const FVAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<'doors' | 'text' | 'fadeout'>('doors')

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // First visit - show FV animation
      setIsVisible(true)
      sessionStorage.setItem('hasVisited', 'true')
      
      // Start animation sequence
      const timer1 = setTimeout(() => {
        setAnimationPhase('text')
      }, 1000) // Doors open for 1 second
      
      const timer2 = setTimeout(() => {
        setAnimationPhase('fadeout')
      }, 2500) // Text shows for 1.5 seconds
      
      const timer3 = setTimeout(() => {
        setIsVisible(false)
      }, 4500) // Total animation duration: 4.5 seconds
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`${styles.fvContainer} ${animationPhase === 'fadeout' ? styles.fadeOut : ''}`}>
      {/* Background light effect */}
      <div className={`${styles.lightBackground} ${animationPhase !== 'doors' ? styles.lightVisible : ''}`} />
      
      {/* Shoji doors */}
      <div className={`${styles.shojiContainer} ${animationPhase !== 'doors' ? styles.doorsOpen : ''}`}>
        <div className={styles.shojiLeft} />
        <div className={styles.shojiRight} />
      </div>
      
      {/* Text message */}
      <div className={`${styles.textContainer} ${animationPhase === 'text' || animationPhase === 'fadeout' ? styles.textVisible : ''}`}>
        <div className={styles.textContent}>
          <p className={styles.mainText}>あなたの旅には、</p>
          <p className={styles.mainText}>きっと意味がある。</p>
        </div>
      </div>
    </div>
  )
}

export default FVAnimation
