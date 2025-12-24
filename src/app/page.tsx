import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <div className="h-24"></div>
      <main className="min-h-screen">
        <HeroSection />
      </main>
      <Footer />
    </>
  )
}
