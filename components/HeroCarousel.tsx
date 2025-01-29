'use client'

import { useState, useEffect } from 'react'

const images = [
  '/images/hero/bg1.jpg',
  '/images/hero/bg2.jpg',
  '/images/hero/bg3.jpg',
  '/images/hero/bg4.jpg',
  '/images/hero/bg5.jpg',
  '/images/hero/bg6.jpg',
  '/images/hero/bg7.jpg',
]

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 10000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {images.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            backgroundBlendMode: 'overlay',
            opacity: currentImage === index ? 0.4 : 0,
          }}
        />
      ))}
    </>
  )
}
