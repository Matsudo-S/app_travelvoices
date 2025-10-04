'use client'

import React, { useRef, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import styles from './mv.module.css'

const MV = () => {
  const splideRef = useRef<any>(null)

  useEffect(() => {
    if (splideRef.current) {
      const splide = splideRef.current.splide
      if (splide) {
        console.log('Splide instance available')
        
      }
    }
  }, [])

  const images = [
    {
      src: 'https://www.kankou-shimane.com/jp/wp-content/uploads/2020/03/890-matsuejo-008--1536x1024.jpg',
      alt: '松江城',
      title: '松江城',
      description: '島根県'
    },
    {
      src: 'https://www.kankou-shimane.com/jp/wp-content/uploads/2020/03/0311-sinjiko-002-1.jpg',
      alt: '宍道湖',
      title: '宍道湖',
      description: '島根県'
    },
    {
      src: 'https://www.kankou-shimane.com/jp/wp-content/uploads/2020/03/4102-izumotaisha-004.jpg',
      alt: '出雲大社',
      title: '出雲大社',
      description: '島根県'
    }
  ]

  return (
    <section className={styles.mv}>
      <Splide
        ref={splideRef}
        options={{
          type: 'loop',
          drag: 'free',
          focus: 'center',
          perPage: 1.5,
          speed: 1500,
          arrows: true,
          pagination: true,
          keyboard: false,
          autoplay: {
            delay: 2000,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
          extensions: {
          AutoScroll: {
            speed: 1500,
              pauseOnHover: false,
              pauseOnFocus: false,
            },
          },
        }}
        aria-label="メインビジュアル"
      >
        {images.map((image, index) => (
            <SplideSlide key={index}>
              <div className={styles.slide__content}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.slide__image}
                  loading="lazy"
                />
                <div className={styles.slide__overlay}>
                  <div className={styles.slide__text}>
                    <h1 className={styles.slide__title}>{image.title}</h1>
                    <p className={styles.slide__description}>{image.description}</p>
                  </div>
                </div>
              </div>
            </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}

export default MV
