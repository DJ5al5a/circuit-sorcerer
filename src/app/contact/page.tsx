'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { TerminalIcon } from '@/components/icons/CircuitIcons'
import { Mail, Github, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '@/config/site'

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingContact(true)

    try {
      const response = await fetch('https://n8n.circuitsorcerer.us.kg/webhook/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, type: 'contact' })
      })

      if (response.ok) {
        alert('Message sent! I will get back to you soon.')
        setContactForm({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmittingContact(false)
    }
  }

  return (
    <>
      <Navigation />
      <div className="h-24"></div>
      <main className="min-h-screen relative flex justify-center">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-30 -z-10"
          style={{
            backgroundImage: 'url(/sorcerer.jpeg)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="fixed inset-0 bg-background/80 -z-10" />

        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* Page Header */}
          <div className="dashboard-card">
            <TerminalIcon size={48} className="text-primary mb-4" />
            <span className="tech-label">CONTACT</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Get In Touch
            </h1>
            <p className="text-text-secondary">
              Feel free to reach out through any of these channels:
            </p>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="dashboard-card hover:border-primary flex items-center gap-4"
            >
              <Mail size={24} className="text-primary" />
              <div>
                <div className="text-xs text-text-tertiary font-mono">EMAIL</div>
                <div className="text-sm text-text-secondary">{siteConfig.author.email}</div>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.author.emailSecondary}`}
              className="dashboard-card hover:border-primary flex items-center gap-4"
            >
              <Mail size={24} className="text-primary" />
              <div>
                <div className="text-xs text-text-tertiary font-mono">EMAIL (ALTERNATE)</div>
                <div className="text-sm text-text-secondary">{siteConfig.author.emailSecondary}</div>
              </div>
            </a>

            <a
              href={siteConfig.author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="dashboard-card hover:border-primary flex items-center gap-4"
            >
              <Github size={24} className="text-primary" />
              <div>
                <div className="text-xs text-text-tertiary font-mono">GITHUB</div>
                <div className="text-sm text-text-secondary">DJ5al5a</div>
              </div>
            </a>

            <div className="dashboard-card bg-surface-elevated flex items-center gap-4">
              <MessageSquare size={24} className="text-accent" />
              <div>
                <div className="text-xs text-text-tertiary font-mono">DISCORD</div>
                <div className="text-sm text-text-secondary">{siteConfig.author.discord}</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="dashboard-card">
            <span className="tech-label">MESSAGE</span>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Send a Message</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-text-secondary mb-2 text-sm">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary resize-vertical"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {isSubmittingContact ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
