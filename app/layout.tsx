import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bauhaus Studio — Próximamente',
  description:
    'Estudio de arquitectura bioclimática en Huaraz, Perú. Próxima apertura.',
  openGraph: {
    title: 'Bauhaus Studio',
    description: 'Arquitectura bioclimática. Huaraz, Perú.',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={urbanist.variable}>
      <body className="font-sans bg-cream text-stone-dark antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
