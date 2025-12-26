'use client'

import { siteConfig } from '@/config/site'
import { CircuitNodeIcon } from '@/components/icons/CircuitIcons'

const technologies = [
  'Docker',
  'Linux',
  'Nginx',
  'Next.js',
  'TypeScript',
  'Python',
  'Tailscale',
  'Synology NAS',
  'BurpSuite',
  'Git',
  'OpenWRT',
  'Node.js',
]

export function AboutModule() {
  return (
    <div className="dashboard-card h-full">
      <CircuitNodeIcon size={32} className="text-primary mb-4" />
      <span className="tech-label">ABOUT</span>

      <h3 className="text-xl font-bold mb-4 text-text-primary">Who I Am</h3>

      <p className="text-text-secondary mb-6 leading-relaxed">
        {siteConfig.author.bioExtended}
      </p>

      <div className="space-y-2">
        <p className="text-sm text-text-tertiary font-mono uppercase tracking-wider">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="tag text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
