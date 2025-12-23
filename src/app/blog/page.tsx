import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-void pt-24">
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-8 font-display text-5xl font-bold text-electric-cyan text-glow-cyan md:text-7xl">
            Blog
          </h1>
          <p className="text-xl text-text-secondary">
            Coming soon - Technical write-ups and infrastructure guides.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
