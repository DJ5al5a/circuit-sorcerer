'use client'

import { TerminalIcon } from '@/components/icons/CircuitIcons'
import { siteConfig } from '@/config/site'
import { Mail, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export function ContactModule() {
  return (
    <div className="dashboard-card h-full">
      <TerminalIcon size={32} className="text-primary mb-4" />
      <span className="tech-label">CONTACT</span>

      <h3 className="text-xl font-bold mb-4 text-text-primary">Get In Touch</h3>

      <p className="text-text-secondary mb-6 leading-relaxed">
        Have a project in mind or want to collaborate? Feel free to reach out through email or Discord.
      </p>

      {/* Contact Options */}
      <div className="space-y-3">
        <a
          href={`mailto:${siteConfig.author.email}`}
          className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-surface-elevated transition-all group"
        >
          <Mail size={20} className="text-primary" />
          <div className="flex-1">
            <div className="text-xs text-text-tertiary font-mono">EMAIL</div>
            <div className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              {siteConfig.author.email}
            </div>
          </div>
        </a>

        <a
          href={`mailto:${siteConfig.author.emailSecondary}`}
          className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-surface-elevated transition-all group"
        >
          <Mail size={20} className="text-primary" />
          <div className="flex-1">
            <div className="text-xs text-text-tertiary font-mono">EMAIL (ALTERNATE)</div>
            <div className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              {siteConfig.author.emailSecondary}
            </div>
          </div>
        </a>

        <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-surface-elevated">
          <MessageSquare size={20} className="text-accent" />
          <div className="flex-1">
            <div className="text-xs text-text-tertiary font-mono">DISCORD</div>
            <div className="text-sm text-text-secondary">
              {siteConfig.author.discord}
            </div>
          </div>
        </div>
      </div>

      {/* Full Contact Page Link */}
      <Link
        href="/contact"
        className="mt-6 block text-center btn btn-outline w-full"
      >
        Full Contact Form
      </Link>
    </div>
  )
}
