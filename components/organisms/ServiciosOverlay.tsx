'use client'

import { useEffect, useState } from 'react'
import { X, ArrowLeft } from 'lucide-react'

interface Props {
  onClose: () => void
}

interface Servicio {
  nombre: string
  foto: string | null
  descripcion: string
}

interface Departamento {
  nombre: string
  servicios: Servicio[]
}

const DEPARTAMENTOS: Departamento[] = [
  {
    nombre: 'Departamento de Diseño',
    servicios: [
      { nombre: 'Diseño Arquitectónico',           foto: null, descripcion: '' },
      { nombre: 'Diseño de Interiores',             foto: null, descripcion: '' },
      { nombre: 'Ingeniería Estructural',           foto: null, descripcion: '' },
      { nombre: 'Ingeniería Sanitaria y Eléctrica', foto: null, descripcion: '' },
      { nombre: 'Topografía',                       foto: null, descripcion: '' },
    ],
  },
  {
    nombre: 'Departamento de Saneamiento Predial',
    servicios: [
      { nombre: 'Independización',          foto: null, descripcion: '' },
      { nombre: 'Subdivisión',              foto: null, descripcion: '' },
      { nombre: 'Declaratoria de Fábrica',  foto: null, descripcion: '' },
      { nombre: 'Visación de Planos',       foto: null, descripcion: '' },
      { nombre: 'Licencia de Construcción', foto: null, descripcion: '' },
    ],
  },
]

type SelectedServicio = Servicio & { departamento: string }

export default function ServiciosOverlay({ onClose }: Props) {
  const [visible,       setVisible]       = useState(false)
  const [selected,      setSelected]      = useState<SelectedServicio | null>(null)
  const [mobileDetail,  setMobileDetail]  = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') mobileDetail ? handleBack() : handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileDetail])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  const handleSelect = (servicio: Servicio, departamento: string) => {
    setSelected({ ...servicio, departamento })
    setMobileDetail(true)
  }

  const handleBack = () => {
    setMobileDetail(false)
    setSelected(null)
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Botón cerrar / volver (móvil) */}
      <div style={{ position: 'fixed', top: '2rem', right: '1.5rem', zIndex: 101, display: 'flex', alignItems: 'center', gap: '12px' }}>
        {mobileDetail && (
          <button
            onClick={handleBack}
            aria-label="Volver"
            className="md:hidden"
            style={{ color: 'rgba(255,255,255,0.6)', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s ease', padding: '4px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
        )}
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          style={{ color: 'rgba(255,255,255,0.6)', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s ease', padding: '4px' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Título */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5rem', paddingBottom: '3rem', flexShrink: 0 }}>
        <p
          className="uppercase tracking-[0.3em] font-light"
          style={{ fontSize: '10px', color: 'rgba(255,255,255,0.95)' }}
        >
          Servicios
        </p>
      </div>

      {/* ══ DESKTOP: lista centrada → detalle izquierda / lista derecha ══ */}
      <div
        className="hidden md:flex"
        style={{ flex: 1, overflow: 'hidden' }}
      >
        {/* Detalle — aparece a la IZQUIERDA al seleccionar */}
        <div
          style={{
            width: selected ? '60%' : '0%',
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'width 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              opacity: selected ? 1 : 0,
              transition: 'opacity 0.35s ease 0.2s',
              padding: '0 5rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {selected && <DetalleServicio selected={selected} />}
          </div>
        </div>

        {/* Lista — centrada (vertical + horizontal) por defecto, luego a la DERECHA */}
        <div
          style={{
            width: selected ? '40%' : '100%',
            flexShrink: 0,
            overflowY: 'auto',
            transition: 'width 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              textAlign: selected ? 'left' : 'center',
            }}
          >
            {DEPARTAMENTOS.map((dep) => (
              <div key={dep.nombre} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p
                  className="uppercase tracking-[0.25em] font-light"
                  style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}
                >
                  {dep.nombre}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: selected ? '0.65rem' : '0.85rem' }}>
                  {dep.servicios.map((servicio) => {
                    const isActive = selected?.nombre === servicio.nombre
                    return (
                      <li key={servicio.nombre}>
                        <button
                          onClick={() => handleSelect(servicio, dep.nombre)}
                          style={{
                            fontSize: selected ? '13px' : '15px',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.65)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            fontWeight: isActive ? 500 : 300,
                            transition: 'color 0.2s ease, font-size 0.5s ease',
                            display: 'block',
                            width: '100%',
                            textAlign: selected ? 'left' : 'center',
                          }}
                          onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,1)' }}
                          onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                        >
                          {servicio.nombre}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MÓVIL: lista → detalle ══ */}
      <div className="flex md:hidden flex-1 overflow-y-auto">

        {/* Lista móvil */}
        <div
          style={{
            position: 'absolute', inset: 0, top: '9rem',
            padding: '0 1.5rem 3rem',
            display: 'flex', flexDirection: 'column', gap: '2rem',
            opacity: mobileDetail ? 0 : 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: mobileDetail ? 'none' : 'auto',
            overflowY: 'auto',
          }}
        >
          {DEPARTAMENTOS.map((dep) => (
            <div key={dep.nombre} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <p className="uppercase tracking-[0.2em] font-light" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>
                {dep.nombre}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {dep.servicios.map((servicio) => (
                  <li key={servicio.nombre}>
                    <button
                      onClick={() => handleSelect(servicio, dep.nombre)}
                      className="font-light tracking-wide text-left w-full"
                      style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >
                      {servicio.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detalle móvil */}
        {selected && (
          <div
            style={{
              position: 'absolute', inset: 0, top: '9rem',
              padding: '0 1.5rem 3rem',
              opacity: mobileDetail ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: mobileDetail ? 'auto' : 'none',
              overflowY: 'auto',
            }}
          >
            <DetalleServicio selected={selected} />
          </div>
        )}
      </div>
    </div>
  )
}

function DetalleServicio({ selected }: { selected: { nombre: string; foto: string | null; descripcion: string; departamento: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '360px' }}>
      {/* Foto */}
      <div
        style={{
          width: '100%',
          aspectRatio: '3 / 4',
          maxHeight: '50vh',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={selected.foto} alt={selected.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span className="uppercase tracking-widest font-light" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>
            Foto
          </span>
        )}
      </div>
      {/* Texto */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p className="uppercase tracking-[0.2em] font-light" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>
          {selected.departamento}
        </p>
        <p className="font-light tracking-tight" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.2 }}>
          {selected.nombre}
        </p>
        <p
          className="font-light"
          style={{
            fontSize: '12px',
            color: selected.descripcion ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)',
            fontStyle: selected.descripcion ? 'normal' : 'italic',
            lineHeight: 1.6,
          }}
        >
          {selected.descripcion || 'Descripción próximamente.'}
        </p>
      </div>
    </div>
  )
}
