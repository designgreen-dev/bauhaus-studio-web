interface CountdownUnitProps {
  value: number
  label: string
}

export default function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-5xl md:text-6xl font-light tabular-nums tracking-tight text-stone-dark">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase text-warm-gray">
        {label}
      </span>
    </div>
  )
}
