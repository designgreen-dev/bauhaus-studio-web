'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Instagram, Mail, Phone } from 'lucide-react'
import Logo from '@/components/atoms/Logo'
import NotifyForm from '@/components/molecules/NotifyForm'
import NavMenu from '@/components/molecules/NavMenu'
import NosotrosOverlay from '@/components/organisms/NosotrosOverlay'

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

interface ContactItem {
  href: string
  label: string
  icon: React.ReactNode
  external: boolean
  showLabel?: boolean
}

const CONTACT: ContactItem[] = [
  {
    href: 'https://www.instagram.com/bauhausstd___________?igsh=ZzZyMXJ0dnRyNWJt',
    label: 'Instagram',
    icon: <Instagram size={14} strokeWidth={1.5} />,
    external: true,
  },
  {
    href: 'https://wa.me/51927202550',
    label: 'WhatsApp',
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    href: 'mailto:design.green@bauhaus-studio.pe',
    label: 'Email',
    icon: <Mail size={14} strokeWidth={1.5} />,
    external: false,
  },
  {
    href: 'tel:+51927202550',
    label: '+51 927 202 550',
    icon: <Phone size={14} strokeWidth={1.5} />,
    external: false,
    showLabel: true,
  },
]

function ContactButton({ item }: { item: ContactItem }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={item.href}
      aria-label={item.label}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px',
        color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)',
        transition: 'color 0.2s ease',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {item.icon}
      {item.showLabel && (
        <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em' }}>
          {item.label}
        </span>
      )}
    </a>
  )
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <section className="relative h-screen flex flex-col px-6 pt-12 pb-16 md:px-16 lg:px-28 xl:px-36 overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Arquitectura bioclimática — Bauhaus Studio"
        fill
        className={`object-cover transition-all duration-700 ${isHovered ? '' : 'grayscale'}`}
        priority
        quality={90}
      />

      {/* pointer-events-none para que el gradiente no bloquee los clicks */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75 pointer-events-none" />

      <NavMenu onOpen={setActiveSection} />
      {activeSection === 'nosotros' && (
        <NosotrosOverlay onClose={() => setActiveSection(null)} />
      )}

      <div className="absolute top-12 right-6 md:right-16 lg:right-28 xl:right-36 z-10">
        <Logo />
      </div>

      <div className="relative z-10 mt-auto">
        <div className="space-y-4 max-w-2xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            ARQUITECTURA QUE PERDURA
          </h1>
          <p className="text-sm font-light text-white/90 leading-relaxed tracking-wide max-w-xs">
            Arquitectura bioclimatica, biofilica y Sanemiento Predial
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
            Sé el primero en enterarte
          </p>
          <NotifyForm dark />
        </div>
      </div>

      {/* Barra de contacto — al final del DOM para estar encima de todo */}
      <div className="absolute bottom-16 right-6 md:right-16 lg:right-28 xl:right-36 z-30 flex items-center gap-4">
        {CONTACT.map((item) => (
          <ContactButton key={item.label} item={item} />
        ))}
      </div>
    </section>
  )
}
