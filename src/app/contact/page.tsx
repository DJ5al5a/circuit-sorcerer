import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/config/site'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-void pt-24">
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-8 font-display text-5xl font-bold text-electric-cyan text-glow-cyan md:text-7xl">
            Contact
          </h1>

          <div className="max-w-2xl space-y-8">
            <p className="text-xl text-text-secondary">
              Feel free to reach out through any of these channels:
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-abyss p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
              >
                <Mail className="h-6 w-6" />
                <span className="text-lg">{siteConfig.author.email}</span>
              </a>

              <a
                href={siteConfig.author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-abyss p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
              >
                <Github className="h-6 w-6" />
                <span className="text-lg">GitHub</span>
              </a>

              <a
                href={siteConfig.author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-abyss p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
              >
                <Linkedin className="h-6 w-6" />
                <span className="text-lg">LinkedIn</span>
              </a>

              <a
                href={siteConfig.author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-abyss p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
              >
                <Twitter className="h-6 w-6" />
                <span className="text-lg">Twitter/X</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
