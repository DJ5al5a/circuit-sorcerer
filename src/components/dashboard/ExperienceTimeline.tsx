'use client'

import { TimelineIcon } from '@/components/icons/CircuitIcons'
import { ExperienceCard } from './ExperienceCard'

const experiences = [
  {
    title: 'Self-Hosted Infrastructure',
    company: 'Personal Homelab',
    period: '2022 - Present',
    description: [
      'Built and maintain multi-machine homelab with Synology NAS (4TB), Ryzen 7 workstation (32GB RAM), and Raspberry Pi running Docker containers',
      'Implemented secure network architecture with OpenWRT router, Tailscale VPN mesh, and Pi-hole DNS filtering',
      'Host production services: Emby media server, n8n automation, web hosting, and cloud storage for family and friends',
    ],
    technologies: ['Synology NAS', 'Docker', 'Tailscale', 'OpenWRT', 'Pi-hole', 'Nginx'],
  },
  {
    title: 'Cybersecurity Training',
    company: 'TryHackMe & HackTheBox',
    period: '2024 - Present',
    description: [
      'Actively learning web application security, network pentesting, and CTF challenges',
      'Completed rooms focusing on OWASP Top 10 vulnerabilities',
      'Developing skills in reconnaissance, exploitation, and reporting',
    ],
    technologies: ['BurpSuite', 'Nmap', 'Metasploit', 'Python'],
  },
]

export function ExperienceTimeline() {
  return (
    <div className="dashboard-card">
      <div className="flex items-center gap-4 mb-6">
        <TimelineIcon size={32} className="text-primary" />
        <div>
          <span className="tech-label">EXPERIENCE</span>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Homelab
          </h2>
        </div>
      </div>

      {/* Horizontal scrolling timeline */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </div>
  )
}
