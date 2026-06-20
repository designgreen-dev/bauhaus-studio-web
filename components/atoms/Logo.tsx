import Image from 'next/image'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/bauhaus-02.png"
      alt="Bauhaus Studio"
      width={112}
      height={42}
      className={`object-contain ${className}`}
      priority
    />
  )
}
