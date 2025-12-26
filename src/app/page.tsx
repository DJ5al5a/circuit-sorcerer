import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { HeroDashboard } from '@/components/dashboard/HeroDashboard'
import { AboutModule } from '@/components/dashboard/AboutModule'
import { StatsModule } from '@/components/dashboard/StatsModule'
import { QuickLinksModule } from '@/components/dashboard/QuickLinksModule'
import { ExperienceTimeline } from '@/components/dashboard/ExperienceTimeline'
import { ProjectsGrid } from '@/components/dashboard/ProjectsGrid'
import { ContactModule } from '@/components/dashboard/ContactModule'
import { SocialLinksModule } from '@/components/dashboard/SocialLinksModule'
import { AvailabilityModule } from '@/components/dashboard/AvailabilityModule'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen relative flex justify-center">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-30 -z-10"
          style={{
            backgroundImage: 'url(/sorcerer.jpeg)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="fixed inset-0 bg-background/80 -z-10" />

        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* Hero Panel - Large Featured */}
          <HeroDashboard />

          {/* Top Row: About, Stats, Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AboutModule />
            <StatsModule />
            <QuickLinksModule />
          </div>

          {/* Experience Timeline */}
          <ExperienceTimeline />

          {/* All Projects Grid */}
          <ProjectsGrid />

          {/* Contact Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactModule />
            <SocialLinksModule />
            <AvailabilityModule />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
