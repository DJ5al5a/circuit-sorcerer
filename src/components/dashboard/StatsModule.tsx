'use client'

import { CircuitNodeIcon } from '@/components/icons/CircuitIcons'
import { siteConfig } from '@/config/site'

interface StatItemProps {
  label: string
  value: string | number
  color?: 'primary' | 'success' | 'accent'
}

function StatItem({ label, value, color = 'primary' }: StatItemProps) {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    accent: 'text-accent',
  }

  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-sm text-text-tertiary font-mono uppercase tracking-wide">
        {label}
      </span>
      <span className={`text-lg font-bold ${colorClasses[color]}`}>
        {value}
      </span>
    </div>
  )
}

export function StatsModule() {
  return (
    <div className="dashboard-card h-full">
      <CircuitNodeIcon size={32} className="text-primary mb-4" />
      <span className="tech-label">STATISTICS</span>

      <h3 className="text-xl font-bold mb-4 text-text-primary">System Metrics</h3>

      <div className="space-y-1">
        <StatItem
          label="Total Projects"
          value="11"
          color="primary"
        />
        <StatItem
          label="Technologies"
          value="15+"
          color="primary"
        />
        <StatItem
          label="Self-Hosted"
          value="100%"
          color="success"
        />
        <StatItem
          label="Uptime"
          value="99.9%"
          color="success"
        />
        <StatItem
          label="Experience"
          value={`${siteConfig.author.stats.yearsExperience}y`}
          color="accent"
        />
      </div>

      {/* Status Indicator */}
      <div className="mt-6 flex items-center gap-2">
        <div className="status-dot"></div>
        <span className="text-sm text-text-tertiary font-mono">
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>
    </div>
  )
}
