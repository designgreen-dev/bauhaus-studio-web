import Hero from '@/components/organisms/Hero'
import CountdownSection from '@/components/organisms/CountdownSection'
import SiteFooter from '@/components/organisms/SiteFooter'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <CountdownSection />
      <SiteFooter />
    </main>
  )
}
