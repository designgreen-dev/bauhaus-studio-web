'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Logo({ className = '' }: { className?: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Image
      src="/images/bauhaus-02.png"
      alt="Bauhaus Studio"
      width={112}
      height={42}
      className={`object-contain ${className}`}
      priority
      style={{
        transform: hovered ? 'scale(0.88)' : 'scale(1)',
        transition: 'transform 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  )
}
