'use client'

import { siteConfig } from '@/config/site'
import { MicrochipIcon } from '@/components/icons/CircuitIcons'
import Link from 'next/link'

export function HeroDashboard() {
  return (
    <div className="dashboard-card relative overflow-hidden min-h-[400px] flex items-center">
      {/* Background Circuit Icon */}
      <div className="absolute top-8 right-8 opacity-10">
        <MicrochipIcon size={200} className="text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <span className="tech-label">SYSTEM_ADMIN</span>

        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-text-primary">
          {siteConfig.author.realName || siteConfig.author.name}
        </h1>

        <p className="text-2xl md:text-3xl text-primary mb-4 font-mono">
          {siteConfig.author.name}
        </p>

        <p className="text-xl text-text-secondary mb-2">
          {siteConfig.author.title}
        </p>

        <p className="text-text-tertiary max-w-2xl mb-8 leading-relaxed">
          {siteConfig.author.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link href="#projects" className="btn btn-primary">
            View Projects
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Me
          </Link>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-primary">
              {siteConfig.author.stats.selfHostedServices}+
            </div>
            <div className="text-sm text-text-tertiary">Services Hosted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {siteConfig.author.stats.yearsExperience}+
            </div>
            <div className="text-sm text-text-tertiary">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {siteConfig.author.stats.githubRepos}+
            </div>
            <div className="text-sm text-text-tertiary">GitHub Repos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">
              99.9%
            </div>
            <div className="text-sm text-text-tertiary">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  )
}
