import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteConfig.author.social.github,
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: siteConfig.author.social.linkedin,
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      href: siteConfig.author.social.twitter,
      icon: Twitter,
    },
    {
      name: 'Email',
      href: `mailto:${siteConfig.author.email}`,
      icon: Mail,
    },
  ]

  return (
    <footer className="border-t border-electric-cyan/20 bg-shadow">
      <div className="container mx-auto px-4 py-12">
        {/* Neon Divider */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-electric-cyan to-transparent" />

        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div>
            <h3 className="mb-3 font-display text-xl font-bold text-electric-cyan text-glow-cyan">
              ⚡ Circuit Sorcerer
            </h3>
            <p className="text-sm text-text-secondary">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="mb-3 font-semibold text-arcane-gold">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {siteConfig.footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors hover:text-electric-cyan"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-3 font-semibold text-mystic-purple">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-electric-cyan/30 bg-abyss p-2 transition-all hover:border-arcane-gold hover-glow-gold"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5 text-electric-cyan transition-colors group-hover:text-arcane-gold" />
                </a>
              ))}
            </div>

            {/* Support Link */}
            <Link
              href="/support"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-arcane-gold/30 bg-abyss px-4 py-2 text-sm font-medium text-arcane-gold transition-all hover:bg-arcane-gold hover:text-void hover-glow-gold"
            >
              <Heart className="h-4 w-4 animate-glow-pulse" />
              Support My Work
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-electric-cyan/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-text-muted md:flex-row">
            {/* Copyright */}
            <p>
              © {currentYear} {siteConfig.name} | All rights reserved
            </p>

            {/* Built With */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span>Built with</span>
              <span className="text-electric-cyan">{siteConfig.builtWith.join(', ')}</span>
              <span>✨</span>
            </div>

            {/* Hosting Info */}
            <p>
              Self-hosted on <span className="text-circuit-green">{siteConfig.hosting.platform}</span> |
              Secured with <span className="text-neon-blue">{siteConfig.hosting.security}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
