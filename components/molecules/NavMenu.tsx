'use client'

import { useState } from 'react'

interface Props {
  onOpen: (section: string) => void
}

const links = ['Nosotros', 'Servicios', 'Proyectos', 'Saneamiento Predial', 'Atelier']

export default function NavMenu({ onOpen }: Props) {
  const [open, setOpen] = useState(false)

  const handleSelect = (item: string) => {
    setOpen(false)
    onOpen(item.toLowerCase())
  }

  return (
    <div
      className="fixed top-12 left-6 md:left-16 lg:left-28 xl:left-36 z-20"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Botón hamburger — click para móvil, hover para desktop */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Menú"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', margin: '-4px' }}
      >
        <div className="flex flex-col gap-[5px]">
          <span className={`block h-px w-5 bg-white transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-white transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </div>
      </button>

      {/* pointer-events-none cuando está cerrado para no bloquear toques */}
      <nav className={`mt-4 flex flex-col gap-3 transition-all duration-300 overflow-hidden ${open ? 'opacity-100 max-h-60 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'}`}>
        {links.map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className="text-xs font-light tracking-widest text-white/80 hover:text-white transition-colors duration-200 uppercase text-left"
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  )
}
