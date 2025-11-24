'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type AdCarouselProps = {
  images: { src: string; alt?: string }[]
  intervalMs?: number
  heightClass?: string
}

export default function AdCarousel({
  images,
  intervalMs = 3500,
  heightClass = 'h-64',
}: AdCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <div className={`relative w-full ${heightClass}`}>
      {images.map((img, index) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt || 'Publicité'}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 360px, 360px"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Afficher la publicité ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activeIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}


