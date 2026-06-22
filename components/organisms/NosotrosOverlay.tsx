'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import SmartPhoto from '@/components/atoms/SmartPhoto'

interface Props {
  onClose: () => void
}

const PARTNERS = [
  {
    cargo: 'CEO Partner',
    nombre: 'Ximena Huaman Oyola',
    profesion: 'Arquitecta',
    foto: '/images/ximena.jpg',
  },
  {
    cargo: 'Founding Partner',
    nombre: 'Arturo Escudero',
    profesion: 'Ingeniero Marítimo',
    foto: '/images/arturo.jpg',
  },
]

function PartnerCard({ partner }: { partner: (typeof PARTNERS)[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="w-full relative overflow-hidden"
        style={{ aspectRatio: '3 / 4', maxHeight: '55vh' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <SmartPhoto
          src={partner.foto}
          alt={partner.nombre}
          style={{
            filter: hovered ? 'none' : 'grayscale(100%)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'filter 0.5s ease, transform 0.6s ease',
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p
          className="uppercase tracking-[0.2em] font-light"
          style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}
        >
          {partner.cargo}
        </p>
        <p
          className="font-light tracking-tight"
          style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.2 }}
        >
          {partner.nombre}
        </p>
        <p
          className="font-light tracking-wide"
          style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}
        >
          {partner.profesion}
        </p>
      </div>
    </div>
  )
}

export default function NosotrosOverlay({ onClose }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(245, 240, 232, 0.25)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
        overflowY: 'auto',
      }}
    >
      {/* Botón cerrar */}
      <button
        onClick={handleClose}
        aria-label="Cerrar"
        style={{
          position: 'fixed',
          top: '2rem',
          right: '1.5rem',
          color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          transition: 'color 0.2s ease',
          padding: '4px',
          zIndex: 101,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      {/* Contenido */}
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-20 md:px-16">
        <p
          className="uppercase tracking-[0.3em] font-light mb-12"
          style={{ fontSize: '10px', color: 'rgba(255,255,255,0.95)' }}
        >
          Nosotros
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-2xl">
          {PARTNERS.map((partner) => (
            <PartnerCard key={partner.nombre} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  )
}
