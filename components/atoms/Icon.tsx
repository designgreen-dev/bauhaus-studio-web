import { icons, type LucideProps } from 'lucide-react'

export type IconName = keyof typeof icons

interface IconProps extends LucideProps {
  name: IconName
}

export default function Icon({ name, size = 18, ...props }: IconProps) {
  const LucideIcon = icons[name]
  return <LucideIcon size={size} {...props} />
}
