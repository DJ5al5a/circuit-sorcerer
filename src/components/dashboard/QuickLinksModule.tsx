'use client'

import { NetworkIcon } from '@/components/icons/CircuitIcons'
import { siteConfig } from '@/config/site'
import { Github, MessageSquare, Mail } from 'lucide-react'

interface QuickLinkProps {
  icon: React.ReactNode
  label: string
  href: string
  external?: boolean
}

function QuickLink({ icon, label, href, external = false }: QuickLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-surface-elevated transition-all group"
    >
      <div className="text-primary group-hover:text-primary-hover transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
        {label}
      </span>
    </a>
  )
}

export function QuickLinksModule() {
  return (
    <div className="dashboard-card h-full">
      <NetworkIcon size={32} className="text-primary mb-4" />
      <span className="tech-label">QUICK LINKS</span>

      <h3 className="text-xl font-bold mb-4 text-text-primary">Connect</h3>

      <div className="space-y-2">
        <QuickLink
          icon={<Github size={20} />}
          label="GitHub"
          href={siteConfig.author.social.github}
          external
        />
        <div className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-surface-elevated transition-all">
          <div className="text-primary">
            <MessageSquare size={20} />
          </div>
          <span className="text-sm font-medium text-text-secondary">
            Discord: {siteConfig.author.discord}
          </span>
        </div>
        <QuickLink
          icon={<Mail size={20} />}
          label="Email"
          href={`mailto:${siteConfig.author.email}`}
        />
      </div>

      {/* TryHackMe Badge */}
      <div className="mt-6 pt-6 border-t border-border">
        <a
          href={siteConfig.author.platforms.tryhackme.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center p-2 rounded border border-border hover:border-primary transition-all"
        >
          <span className="text-xs font-mono text-accent">TryHackMe Profile →</span>
        </a>
      </div>
    </div>
  )
}
