'use client'

import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function NotifyForm() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')

  const hasError = touched && !isValidEmail(email)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched(true)
    if (!isValidEmail(email)) return

    setStatus('loading')
    await new Promise<void>((resolve) => setTimeout(resolve, 900))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <p className="text-xs tracking-widest uppercase text-sage py-2">
        Gracias — te avisaremos pronto.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col sm:flex-row items-start gap-4 w-full max-w-md"
    >
      <div className="flex-1 w-full">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          status={hasError ? 'error' : 'idle'}
          helperText={hasError ? 'Ingresa un email válido.' : undefined}
          aria-label="Correo electrónico"
          autoComplete="email"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={status === 'loading'}
        className="shrink-0 mt-px"
      >
        Notificarme
      </Button>
    </form>
  )
}
