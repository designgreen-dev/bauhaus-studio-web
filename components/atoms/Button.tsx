import { type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'ghost-light'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-[10px]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-13 px-8 text-xs',
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-stone-dark text-cream hover:bg-earth focus-visible:ring-earth',
  ghost:
    'border border-stone-dark text-stone-dark hover:bg-stone-dark hover:text-cream focus-visible:ring-stone-dark',
  'ghost-light':
    'border border-white text-white hover:bg-white hover:text-stone-dark focus-visible:ring-white',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        'inline-flex items-center justify-center',
        'tracking-widest uppercase font-light',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-1',
        'disabled:pointer-events-none disabled:opacity-40',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  )
}
