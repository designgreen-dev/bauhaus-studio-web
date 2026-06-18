import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['300', '400'],
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
    <html lang="es" className={geistSans.variable}>
      <body className="font-sans bg-cream text-stone-dark antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
