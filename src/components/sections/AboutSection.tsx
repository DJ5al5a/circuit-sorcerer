'use client'

import { siteConfig } from '@/config/site'
import Image from 'next/image'

export function AboutSection() {
  const technologies = [
    'Python',
    'JavaScript/TypeScript',
    'Bash/Shell',
    'Docker',
    'Proxmox',
    'Next.js',
    'Tailwind CSS',
    'n8n',
    'Nginx',
    'Git',
  ]

  return (
    <section id="about" className="section-padding bg-surface/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">01.</span>
              About Me
              <span className="h-px flex-1 bg-border ml-4"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-4 text-text-secondary">
              <p className="leading-relaxed">
                {siteConfig.author.bioExtended}
              </p>

              <p className="leading-relaxed">
                I specialize in building self-hosted infrastructure that prioritizes privacy,
                security, and control. From containerized applications to network security,
                I enjoy exploring the full stack of modern DevOps and cybersecurity practices.
              </p>

              <p className="leading-relaxed">
                Currently focused on expanding my cybersecurity skills through platforms like
                TryHackMe and HackTheBox, while maintaining and improving my homelab infrastructure.
              </p>

              <p className="leading-relaxed mt-6">
                Here are some technologies I've been working with recently:
              </p>

              {/* Technologies Grid */}
              <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm">
                {technologies.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="text-primary">▹</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative group">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all">
                <Image
                  src={siteConfig.author.avatar}
                  alt={siteConfig.author.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="absolute -inset-2 border-2 border-primary/20 rounded-lg -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
