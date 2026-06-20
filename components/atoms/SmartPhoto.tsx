'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

export default function SmartPhoto({ src, alt, className = '', style }: Props) {
  const [position, setPosition] = useState('center 60%')

  useEffect(() => {
    if (!('FaceDetector' in window)) return

    const img = new window.Image()
    img.src = src
    img.onload = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const detector = new (window as any).FaceDetector({ fastMode: false })
        const faces = await detector.detect(img)
        if (!faces.length) return

        // Calcula el centro promedio de todos los rostros detectados
        const cx = faces.reduce((s: number, f: { boundingBox: { x: number; width: number } }) =>
          s + f.boundingBox.x + f.boundingBox.width / 2, 0) / faces.length
        const cy = faces.reduce((s: number, f: { boundingBox: { y: number; height: number } }) =>
          s + f.boundingBox.y + f.boundingBox.height / 2, 0) / faces.length

        const xPct = ((cx / img.naturalWidth) * 100).toFixed(1)
        const yPct = ((cy / img.naturalHeight) * 100).toFixed(1)

        setPosition(`${xPct}% ${yPct}%`)
      } catch {
        // Mantiene el valor por defecto si falla la detección
      }
    }
  }, [src])

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`.trim()}
      style={{ objectPosition: position, ...style }}
    />
  )
}
