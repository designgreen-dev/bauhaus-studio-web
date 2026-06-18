import Icon, { type IconName } from '@/components/atoms/Icon'

interface SocialLinkProps {
  href: string
  label: string
  iconName: IconName
  external?: boolean
}

export default function SocialLink({
  href,
  label,
  iconName,
  external = true,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="text-warm-gray hover:text-stone-dark transition-colors"
    >
      <Icon name={iconName} size={18} strokeWidth={1.5} />
    </a>
  )
}
