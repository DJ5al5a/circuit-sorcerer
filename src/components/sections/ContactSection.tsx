'use client'

import { siteConfig } from '@/config/site'
import { Mail, Github, MessageSquare } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-primary font-mono text-sm mb-4">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              I'm currently open to new opportunities and collaborations. Whether you have a
              question or just want to say hi, my inbox is always open. I'll try my best to get
              back to you!
            </p>
          </div>

          {/* Contact Button */}
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="btn btn-outline text-lg inline-block mb-12"
          >
            Say Hello
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {siteConfig.author.social.github && (
              <a
                href={siteConfig.author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            )}
            {siteConfig.author.social.discord && (
              <div
                className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
                aria-label="Discord"
              >
                <MessageSquare size={24} />
                <span className="text-sm">{siteConfig.author.discord}</span>
              </div>
            )}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
