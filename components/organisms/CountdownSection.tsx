'use client'

import { useState, useEffect } from 'react'
import CountdownUnit from '@/components/molecules/CountdownUnit'

const TARGET_DATE = new Date('2026-03-01T00:00:00-05:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function computeTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const UNITS = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
] as const

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setTimeLeft(computeTimeLeft())
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="px-6 py-16 md:px-16 lg:px-28 xl:px-36 border-t border-warm-gray/20">
      <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-12">
        1 de Marzo, 2026
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 max-w-xl">
        {UNITS.map(({ key, label }) => (
          <CountdownUnit key={key} value={timeLeft[key]} label={label} />
        ))}
      </div>
    </section>
  )
}
