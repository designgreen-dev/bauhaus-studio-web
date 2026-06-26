'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function IntroSplash() {
  const [mounted, setMounted] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Logo fades in after a brief pause
    const logoInTimer = window.setTimeout(() => {
      setLogoVisible(true)
    }, 300)

    // Logo and background fade out simultaneously
    const exitTimer = window.setTimeout(() => {
      setLogoVisible(false)
      setExiting(true)
    }, 2400)

    // Remove from DOM once transition ends
    const unmountTimer = window.setTimeout(() => {
      setMounted(false)
    }, 3300)

    return () => {
      window.clearTimeout(logoInTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(unmountTimer)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          logoVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <Image
          src="/images/bauhaus-02.png"
          alt="Bauhaus Studio"
          width={180}
          height={68}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
