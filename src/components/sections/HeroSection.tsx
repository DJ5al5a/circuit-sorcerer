'use client'

import { siteConfig } from '@/config/site'
import { ArrowDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Small greeting */}
          <p className="text-primary font-mono text-sm md:text-base mb-5 animate-fade-in">
            Hi, my name is
          </p>

          {/* Large name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            {siteConfig.author.realName}
          </h1>

          {/* Subtitle */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-secondary mb-6 animate-fade-in">
            I build and secure digital infrastructure.
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed animate-fade-in">
            {siteConfig.author.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <a
              href="#projects"
              className="btn btn-primary inline-block"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn btn-outline inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  )
}
