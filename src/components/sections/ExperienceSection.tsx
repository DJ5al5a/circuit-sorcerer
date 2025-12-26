'use client'

import { ExternalLink } from 'lucide-react'

export function ExperienceSection() {
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

  const certifications = [
    { name: 'eJPT', status: 'Planned', year: '2025' },
    { name: 'CompTIA Security+', status: 'Planned', year: '2025' },
  ]

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">02.</span>
              Experience
              <span className="h-px flex-1 bg-border ml-4"></span>
            </h2>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-12 mb-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{exp.title}</h3>
                    <p className="text-primary font-mono text-sm">{exp.company}</p>
                    <p className="text-text-tertiary text-sm">{exp.period}</p>
                  </div>

                  <ul className="space-y-2 text-text-secondary">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary mt-2">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Certifications & Goals</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="card">
                  <h4 className="font-bold text-text-primary">{cert.name}</h4>
                  <p className="text-sm text-text-secondary">{cert.status} • {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
