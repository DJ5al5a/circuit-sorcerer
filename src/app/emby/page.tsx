'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { embyData } from '@/config/emby'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useState, useEffect } from 'react'
import { Monitor, AlertCircle, CheckCircle, XCircle, ExternalLink, Smartphone, Tv, Tablet, Laptop, Film, Send, UserPlus } from 'lucide-react'

type StatusType = 'up' | 'maintenance' | 'down'

export default function EmbyPage() {
  const [serverStatus, setServerStatus] = useState<StatusType>('up')
  const [statusMessage, setStatusMessage] = useState('')
  const [mediaRequestForm, setMediaRequestForm] = useState({
    title: '',
    type: 'movie',
    name: '',
    email: ''
  })
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  })
  const [isSubmittingMediaRequest, setIsSubmittingMediaRequest] = useState(false)
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false)

  useEffect(() => {
    const checkStatus = async () => {
      const startTime = Date.now()
      try {
        const response = await fetch(`https://${embyData.serverUrl}/System/Info/Public`, {
          headers: {
            'X-Emby-Token': embyData.apiKey
          }
        })
        const endTime = Date.now()
        const pingTime = endTime - startTime
        if (response.ok) {
          setServerStatus('up')
          setStatusMessage(`Server is online - ${pingTime}ms`)
        } else {
          setServerStatus('down')
          setStatusMessage('Server is offline')
        }
      } catch (error) {
        setServerStatus('down')
        setStatusMessage('Unable to check server status')
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (serverStatus) {
      case 'up':
        return <CheckCircle className="h-6 w-6 text-green-400" />
      case 'maintenance':
        return <AlertCircle className="h-6 w-6 text-yellow-400" />
      case 'down':
        return <XCircle className="h-6 w-6 text-red-400" />
    }
  }

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'up':
        return 'border-green-400/30 bg-green-400/10'
      case 'maintenance':
        return 'border-yellow-400/30 bg-yellow-400/10'
      case 'down':
        return 'border-red-400/30 bg-red-400/10'
    }
  }

  const handleMediaRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingMediaRequest(true)

    try {
      const response = await fetch('https://n8n.circuitsorcerer.us.kg/webhook/media-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: mediaRequestForm.title,
          type: mediaRequestForm.type,
          name: mediaRequestForm.name,
          email: mediaRequestForm.email
        })
      })

      if (response.ok) {
        alert('Request submitted! I will review it and add it to the server.')
        setMediaRequestForm({ title: '', type: 'movie', name: '', email: '' })
      } else {
        alert('Failed to submit request. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmittingMediaRequest(false)
    }
  }

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingRegistration(true)

    try {
      const response = await fetch('https://n8n.circuitsorcerer.us.kg/webhook/emby-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registrationForm.name,
          email: registrationForm.email,
          username: registrationForm.username,
          password: registrationForm.password
        })
      })

      if (response.ok) {
        alert('Registration request submitted! You will receive a response within 24-48 hours.')
        setRegistrationForm({ name: '', email: '', username: '', password: '' })
      } else {
        alert('Failed to submit registration. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmittingRegistration(false)
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

        <div className="w-full container max-w-7xl mx-auto px-4 py-16">
          <motion.h1
            className="mb-8 font-display text-5xl font-bold text-electric-cyan text-glow-cyan md:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Emby Server
          </motion.h1>

          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Server Status */}
            <motion.div
              className={`rounded-lg p-8 border ${getStatusColor()}`}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <Monitor className="h-8 w-8 text-electric-cyan" />
                <h2 className="font-display text-2xl font-bold text-electric-cyan">Server Status</h2>
                {getStatusIcon()}
              </div>
              <p className="text-text-secondary">{statusMessage}</p>
              <div className="mt-4 p-4 bg-abyss rounded border border-electric-cyan/20">
                <p className="text-text-secondary">{embyData.adminMessage}</p>
              </div>
            </motion.div>

            {/* Access Emby Server */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">Access Server</h2>
              <p className="text-text-secondary mb-6">
                Click the button below to access the Emby media server. You'll need your login credentials to sign in.
              </p>
              <a
                href={`https://${embyData.serverUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors"
              >
                Open Emby Server
                <ExternalLink className="h-5 w-5" />
              </a>
              <div className="mt-6 p-4 bg-void rounded border border-electric-cyan/20">
                <p className="text-text-secondary text-sm">
                  <strong className="text-electric-cyan">Server URL:</strong> {embyData.serverUrl}
                </p>
              </div>
            </motion.div>

            {/* Media Request Form */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <Film className="h-8 w-8 text-arcane-gold" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-electric-cyan">Request Movie/TV Show</h2>
                  <p className="text-text-secondary text-sm">Can't find what you're looking for? Request it!</p>
                </div>
              </div>
              <form onSubmit={handleMediaRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Title</label>
                    <input
                      type="text"
                      value={mediaRequestForm.title}
                      onChange={(e) => setMediaRequestForm({ ...mediaRequestForm, title: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      placeholder="Movie or TV show title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Type</label>
                    <select
                      value={mediaRequestForm.type}
                      onChange={(e) => setMediaRequestForm({ ...mediaRequestForm, type: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    >
                      <option value="movie">Movie</option>
                      <option value="tv">TV Show</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Your Name</label>
                    <input
                      type="text"
                      value={mediaRequestForm.name}
                      onChange={(e) => setMediaRequestForm({ ...mediaRequestForm, name: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={mediaRequestForm.email}
                    onChange={(e) => setMediaRequestForm({ ...mediaRequestForm, email: e.target.value })}
                    className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingMediaRequest}
                  className="w-full px-6 py-4 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  {isSubmittingMediaRequest ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </motion.div>

            {/* Account Registration Form */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="h-8 w-8 text-arcane-gold" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-electric-cyan">Request Account Access</h2>
                  <p className="text-text-secondary text-sm">Don't have an account? Request access to the Emby server.</p>
                </div>
              </div>
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Name</label>
                    <input
                      type="text"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Desired Username</label>
                    <input
                      type="text"
                      value={registrationForm.username}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, username: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2 text-sm">Desired Password</label>
                    <input
                      type="password"
                      value={registrationForm.password}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, password: e.target.value })}
                      className="w-full p-3 bg-abyss border border-electric-cyan/20 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                      required
                    />
                  </div>
                </div>
                <div className="p-4 bg-void rounded border border-electric-cyan/20">
                  <p className="text-text-secondary text-sm">
                    Requests are typically reviewed within 24-48 hours. You'll receive a confirmation email once your account is approved.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingRegistration}
                  className="w-full px-6 py-4 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  {isSubmittingRegistration ? 'Submitting...' : 'Request Access'}
                </button>
              </form>
            </motion.div>

            {/* Connection Instructions */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">Connection Instructions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-6 w-6 text-electric-cyan mt-1" />
                    <div>
                      <h3 className="font-semibold text-arcane-gold mb-1">Phones</h3>
                      <p className="text-text-secondary text-sm">{embyData.connectionInstructions.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tablet className="h-6 w-6 text-electric-cyan mt-1" />
                    <div>
                      <h3 className="font-semibold text-arcane-gold mb-1">Tablets</h3>
                      <p className="text-text-secondary text-sm">{embyData.connectionInstructions.tablet}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Tv className="h-6 w-6 text-electric-cyan mt-1" />
                    <div>
                      <h3 className="font-semibold text-arcane-gold mb-1">Smart TVs</h3>
                      <p className="text-text-secondary text-sm">{embyData.connectionInstructions.smartTV}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Laptop className="h-6 w-6 text-electric-cyan mt-1" />
                    <div>
                      <h3 className="font-semibold text-arcane-gold mb-1">Computers</h3>
                      <p className="text-text-secondary text-sm">{embyData.connectionInstructions.computer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
