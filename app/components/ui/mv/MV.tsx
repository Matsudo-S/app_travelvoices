'use client'

import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from './mv.module.css'

const MV = () => {
  const swiperRef = useRef<any>(null)

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

  // ループ用にスライドを複製（slidesPerView: 1.5で安定したループのため）
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <section className={styles.mv}>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        className="mv-swiper"
        initialSlide={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 1.5,
            centeredSlides: true,
          },
        }}
      >
        {duplicatedImages.map((image, index) => (
          <SwiperSlide key={index}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default MV
