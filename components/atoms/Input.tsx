import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'idle' | 'error' | 'success'
  label?: string
  helperText?: string
  dark?: boolean
}

const borderByStatus: Record<NonNullable<InputProps['status']>, string> = {
  idle: 'border-warm-gray focus:border-stone-dark',
  error: 'border-red-400 focus:border-red-500',
  success: 'border-sage focus:border-sage',
}

const darkBorderByStatus: Record<NonNullable<InputProps['status']>, string> = {
  idle: 'border-white/30 focus:border-white',
  error: 'border-red-400 focus:border-red-400',
  success: 'border-white/60 focus:border-white',
}

const helperColorByStatus: Record<NonNullable<InputProps['status']>, string> = {
  idle: 'text-warm-gray',
  error: 'text-red-400',
  success: 'text-sage',
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { status = 'idle', label, helperText, id, className = '', dark = false, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className={`text-[10px] tracking-widest uppercase ${dark ? 'text-white/50' : 'text-warm-gray'}`}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={[
          'h-11 w-full bg-transparent',
          'border-b px-0',
          dark ? 'text-white placeholder:text-white/30' : 'text-stone-dark placeholder:text-warm-gray',
          'text-sm font-light',
          'outline-none transition-colors',
          dark ? darkBorderByStatus[status] : borderByStatus[status],
          className,
        ].join(' ')}
        {...props}
      />
      {helperText && (
        <p className={`text-xs ${dark ? 'text-red-400' : helperColorByStatus[status]}`}>{helperText}</p>
      )}
    </div>
  )
})

export default Input
