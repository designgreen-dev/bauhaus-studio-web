import SocialLink from '@/components/molecules/SocialLink'

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com/bauhausstudio.pe',
    label: 'Instagram de Bauhaus Studio',
    iconName: 'Instagram',
    external: true,
  },
  {
    href: 'https://linkedin.com/company/bauhausstudio',
    label: 'LinkedIn de Bauhaus Studio',
    iconName: 'Linkedin',
    external: true,
  },
  {
    href: 'mailto:hola@bauhausstudio.pe',
    label: 'Correo de Bauhaus Studio',
    iconName: 'Mail',
    external: false,
  },
] as const

export default function SiteFooter() {
  return (
    <footer className="mt-auto px-6 py-10 md:px-16 lg:px-28 xl:px-36 border-t border-warm-gray/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <nav aria-label="Redes sociales" className="flex items-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink
              key={link.iconName}
              href={link.href}
              label={link.label}
              iconName={link.iconName}
              external={link.external}
            />
          ))}
        </nav>
        <p className="text-[10px] tracking-wide text-warm-gray font-light">
          &copy; 2026 Bauhaus Studio. Huaraz, Perú.
        </p>
      </div>
    </footer>
  )
}
