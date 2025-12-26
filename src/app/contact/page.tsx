'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { TerminalIcon } from '@/components/icons/CircuitIcons'
import { Mail, Github, MessageSquare, Send, Film } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '@/config/site'

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [requestForm, setRequestForm] = useState({
    title: '',
    type: 'movie',
    name: '',
    email: ''
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingContact(true)

    try {
      const response = await fetch('/api/contact', {
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

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingRequest(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: requestForm.name,
          email: requestForm.email,
          message: `${requestForm.type.toUpperCase()} Request: ${requestForm.title}`,
          type: 'media-request'
        })
      })

      if (response.ok) {
        alert('Request submitted! I will review it.')
        setRequestForm({ title: '', type: 'movie', name: '', email: '' })
      } else {
        alert('Failed to submit request. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmittingRequest(false)
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

          {/* Movie/TV Request Form */}
          <div className="dashboard-card">
            <div className="flex items-center gap-3 mb-6">
              <Film size={32} className="text-accent" />
              <div>
                <span className="tech-label">EMBY REQUEST</span>
                <h2 className="text-2xl font-bold text-text-primary">Movie/TV Show Request</h2>
              </div>
            </div>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">Title</label>
                  <input
                    type="text"
                    value={requestForm.title}
                    onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                    className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary"
                    placeholder="Movie or TV show title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">Type</label>
                  <select
                    value={requestForm.type}
                    onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                    className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary"
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-text-secondary mb-2 text-sm">Email</label>
                <input
                  type="email"
                  value={requestForm.email}
                  onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                  className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:outline-none text-text-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingRequest}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {isSubmittingRequest ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
