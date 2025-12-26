'use client'

import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function ProjectsSection() {
  const featuredProjects = [
    {
      title: 'FAFO Website',
      description: 'Advocacy website for Florida DCF families. Privacy-first static site with dark mode, legal resources, and court hearing templates.',
      image: '/projects/fafo.png',
      technologies: ['HTML/CSS', 'JavaScript', 'Privacy-First Design'],
      links: {
        github: 'https://github.com/dj5al5a/fafo-website',
        live: 'https://familyandfriendoutreach.com',
      },
    },
    {
      title: 'Emby Media Server',
      description: 'Self-hosted Emby streaming server running on dedicated Intel i5 machine. Provides Netflix-like experience for family and friends with user management, mobile apps, and Smart TV support.',
      image: '/projects/media-server.png',
      technologies: ['Emby', 'Intel i5', 'Docker', 'Nginx'],
      links: {
        live: '/emby',
      },
    },
    {
      title: 'Circuit Sorcerer Portfolio',
      description: 'This website! A modern, accessible portfolio built with Next.js and deployed on self-hosted infrastructure.',
      image: '/projects/portfolio.png',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      links: {
        github: 'https://github.com/dj5al5a/circuit-sorcerer',
      },
    },
  ]

  return (
    <section id="projects" className="section-padding bg-surface/50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">03.</span>
              Things I've Built
              <span className="h-px flex-1 bg-border ml-4"></span>
            </h2>
          </div>

          {/* Featured Projects */}
          <div className="space-y-20">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className={`grid md:grid-cols-12 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:dir-rtl'
                }`}
              >
                {/* Project Image */}
                <div className="md:col-span-7 relative group">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-primary/10 border border-border hover:border-primary/40 transition-all">
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                      [Project Image]
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className={`md:col-span-5 space-y-4 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <p className="text-primary font-mono text-sm">Featured Project</p>
                  <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>

                  <div className="card bg-surface p-6">
                    <p className="text-text-secondary">{project.description}</p>
                  </div>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="font-mono text-sm text-text-tertiary">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex gap-4 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        aria-label="GitHub repository"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        aria-label="Live project"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-16">
            <Link href="/projects" className="btn btn-outline">
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
