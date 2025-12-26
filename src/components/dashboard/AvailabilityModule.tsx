'use client'

import { StatusIcon } from '@/components/icons/CircuitIcons'
import { Briefcase, Code, GraduationCap } from 'lucide-react'

export function AvailabilityModule() {
  return (
    <div className="dashboard-card h-full">
      <StatusIcon size={32} className="text-success mb-4" />
      <span className="tech-label">STATUS</span>

      <h3 className="text-xl font-bold mb-4 text-text-primary">Availability</h3>

      {/* Status Indicator */}
      <div className="flex items-center gap-3 p-4 rounded-md bg-surface-elevated border border-success/30 mb-6">
        <div className="status-dot"></div>
        <div>
          <div className="text-sm font-bold text-success">OPEN TO OPPORTUNITIES</div>
          <div className="text-xs text-text-tertiary">Currently accepting projects</div>
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Briefcase size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-text-primary">Freelance Work</div>
            <div className="text-xs text-text-tertiary">Infrastructure & automation projects</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Code size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-text-primary">Collaboration</div>
            <div className="text-xs text-text-tertiary">Open source & homelab projects</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <GraduationCap size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-text-primary">Learning</div>
            <div className="text-xs text-text-tertiary">Cybersecurity & cloud technologies</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Briefcase size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-text-primary">Consultations</div>
            <div className="text-xs text-text-tertiary">Technical consulting & advice</div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-tertiary font-mono">AVG RESPONSE TIME</span>
          <span className="text-accent font-bold">{'< 24h'}</span>
        </div>
      </div>
    </div>
  )
}
