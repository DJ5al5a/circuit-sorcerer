'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-lg border border-electric-cyan/30 bg-abyss" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="group relative h-10 w-10 rounded-lg border-2 border-electric-cyan/30 bg-abyss transition-all hover:border-arcane-gold hover-glow-gold"
      aria-label="Toggle theme"
    >
      <Sun className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 text-arcane-gold transition-all group-hover:scale-110 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 text-electric-cyan transition-all group-hover:scale-110 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
