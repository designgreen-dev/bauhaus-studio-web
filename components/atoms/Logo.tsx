'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Logo({ className = '' }: { className?: string }) {
  const [hovered,  setHovered]  = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Image
      src="/images/bauhaus-02.png"
      alt="Bauhaus Studio"
      width={112}
      height={42}
      className={`object-contain ${className}`}
      priority
      style={{
        transform: hovered || scrolled ? 'scale(0.88)' : 'scale(1)',
        transition: 'transform 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  )
}
