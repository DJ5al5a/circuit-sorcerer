'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Cpu } from 'lucide-react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  const externalLinks = [
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Emby', href: '/emby' },
    { name: 'Support', href: '/support' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border'
          : 'bg-background/90 backdrop-blur-sm border-b border-border/50'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Name */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Cpu size={28} className="text-primary" />
            <span className="text-lg font-bold text-text-primary hidden md:block">Circuit Sorcerer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors link-underline"
              >
                {link.name}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors link-underline"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/resume"
              className="btn btn-outline text-sm"
            >
              My Accomplishments
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="flex flex-col py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {externalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/resume"
                className="mx-4 btn btn-outline text-sm text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Accomplishments
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
