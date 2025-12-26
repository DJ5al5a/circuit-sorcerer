'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { embyData } from '@/config/emby'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useState, useEffect } from 'react'
import { Monitor, AlertCircle, CheckCircle, XCircle, User, Lock, Mail, Smartphone, Tv, Tablet, Laptop } from 'lucide-react'

type StatusType = 'up' | 'maintenance' | 'down'

interface StatusResponse {
  status: StatusType
  message?: string
}

export default function EmbyPage() {
  const [serverStatus, setServerStatus] = useState<StatusType>('up')
  const [statusMessage, setStatusMessage] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/emby/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password, confirmPassword })
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message || 'Registration request sent! You will be contacted for approval.')
        setName('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
      } else {
        alert(data.error || 'Failed to submit registration. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(`https://${embyData.serverUrl}`, '_blank')
  }

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

            {/* User Dashboard */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">User Dashboard</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-text-secondary mb-2">Username</label>
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors"
                >
                  Login to Emby Server
                </button>
              </form>
            </motion.div>

            {/* Registration */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">Request Access</h2>
              <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                  <label className="block text-text-secondary mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Access'}
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
