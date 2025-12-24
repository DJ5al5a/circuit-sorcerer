'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Mail, Github, Linkedin, Twitter, Send, Film } from 'lucide-react'
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
      <main className="min-h-screen bg-void">
        <div className="container mx-auto px-4 py-16">
          <motion.h1
            className="mb-8 font-display text-5xl font-bold text-electric-cyan text-glow-cyan md:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Contact
          </motion.h1>

          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Social Links */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <p className="text-xl text-text-secondary mb-6">
                Feel free to reach out through any of these channels:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-shadow p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
                >
                  <Mail className="h-6 w-6" />
                  <span className="text-lg">{siteConfig.author.email}</span>
                </a>

                <a
                  href={siteConfig.author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-shadow p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
                >
                  <Github className="h-6 w-6" />
                  <span className="text-lg">GitHub</span>
                </a>

                <a
                  href={siteConfig.author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-shadow p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="text-lg">LinkedIn</span>
                </a>

                <a
                  href={siteConfig.author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-electric-cyan/30 bg-shadow p-6 text-electric-cyan transition-all hover:border-electric-cyan hover-glow-cyan"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="text-lg">Twitter/X</span>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">Send a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary mb-2">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary resize-vertical"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-3 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmittingContact ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Movie/TV Request Form */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6 flex items-center gap-3">
                <Film className="h-6 w-6" />
                Movie/TV Show Request
              </h2>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-text-secondary mb-2">Title</label>
                    <input
                      type="text"
                      value={requestForm.title}
                      onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                      className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      placeholder="Movie or TV show title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2">Type</label>
                    <select
                      value={requestForm.type}
                      onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                      className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    >
                      <option value="movie">Movie</option>
                      <option value="tv">TV Show</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2">Your Name</label>
                    <input
                      type="text"
                      value={requestForm.name}
                      onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                      className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    value={requestForm.email}
                    onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingRequest}
                  className="w-full py-3 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmittingRequest ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
