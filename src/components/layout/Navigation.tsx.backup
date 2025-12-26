'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from '@/components/custom/ThemeToggle'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'glass-morph py-3' : 'glass-morph py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-display text-xl font-bold transition-all md:text-2xl"
          >
            <Zap className="h-6 w-6 text-lightning animate-glow-pulse" />
            <span className="text-electric-cyan text-glow-cyan group-hover:text-arcane-gold group-hover:text-glow-gold">
              CIRCUIT SORCERER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-2 font-medium transition-all',
                    isActive
                      ? 'text-arcane-gold text-glow-gold'
                      : 'text-text-secondary hover:text-electric-cyan'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-arcane-gold shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg border-2 border-electric-cyan/30 bg-abyss p-2 transition-all hover:border-arcane-gold md:hidden hover-glow-gold"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-crimson-spark" />
              ) : (
                <Menu className="h-6 w-6 text-electric-cyan" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 flex flex-col gap-2 rounded-lg border border-electric-cyan/20 bg-shadow/95 p-4 backdrop-blur-lg md:hidden">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-lg px-4 py-3 font-medium transition-all',
                    isActive
                      ? 'bg-arcane-gold/10 text-arcane-gold border border-arcane-gold/30'
                      : 'text-text-secondary hover:bg-electric-cyan/10 hover:text-electric-cyan'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
