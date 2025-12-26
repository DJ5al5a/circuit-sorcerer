'use client'

import { NetworkIcon } from '@/components/icons/CircuitIcons'
import { siteConfig } from '@/config/site'
import { Github, MessageSquare } from 'lucide-react'

interface SocialLinkProps {
  icon: React.ReactNode
  label: string
  href: string
  username: string
}

function SocialLink({ icon, label, href, username }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-surface-elevated transition-all group"
    >
      <div className="text-primary group-hover:text-primary-hover transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs text-text-tertiary font-mono uppercase">{label}</div>
        <div className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
          {username}
        </div>
      </div>
    </a>
  )
}

export function SocialLinksModule() {
  return (
    <div className="dashboard-card h-full">
      <NetworkIcon size={32} className="text-primary mb-4" />
      <span className="tech-label">SOCIAL</span>

      <h3 className="text-xl font-bold mb-4 text-text-primary">Find Me Online</h3>

      <div className="space-y-3">
        <SocialLink
          icon={<Github size={20} />}
          label="GitHub"
          href={siteConfig.author.social.github}
          username="DJ5al5a"
        />
        <div className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-surface-elevated transition-all">
          <div className="text-primary">
            <MessageSquare size={20} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-text-tertiary font-mono uppercase">Discord</div>
            <div className="text-sm text-text-secondary">
              {siteConfig.author.discord}
            </div>
          </div>
        </div>
      </div>

      {/* TryHackMe Link */}
      <div className="mt-6 pt-6 border-t border-border">
        <a
          href={siteConfig.author.platforms.tryhackme.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center p-3 rounded-md border border-accent hover:bg-accent-light transition-all"
        >
          <span className="text-sm font-mono text-accent">
            🎯 TryHackMe Profile
          </span>
        </a>
      </div>
    </div>
  )
}
