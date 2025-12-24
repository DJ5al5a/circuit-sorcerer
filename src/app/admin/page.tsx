'use client'

import { useState } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Lock, Save } from 'lucide-react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminMessage, setAdminMessage] = useState('Server is currently running normally. No maintenance scheduled.')
  const [isSaving, setIsSaving] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Check password against environment variable via API
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        alert('Incorrect password')
      }
    } catch (error) {
      alert('Authentication error')
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: adminMessage, password })
      })

      if (response.ok) {
        alert('Message updated!')
      } else {
        alert('Failed to save message. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigation />
        <div className="h-24"></div>
        <main className="min-h-screen bg-void">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              className="max-w-md mx-auto bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="mb-6 font-display text-3xl font-bold text-electric-cyan text-center">Admin Access</h1>
              <form onSubmit={handleLogin} className="space-y-4">
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
                <button
                  type="submit"
                  className="w-full py-3 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Login
                </button>
              </form>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    )
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
            Admin Panel
          </motion.h1>

          <motion.div
            className="max-w-4xl mx-auto bg-abyss rounded-lg p-8 border border-electric-cyan/30"
            variants={fadeInUp}
          >
            <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">Update Server Message</h2>
            <div className="space-y-4">
              <textarea
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                className="w-full p-4 bg-void border border-electric-cyan/30 rounded focus:border-electric-cyan focus:outline-none text-text-primary resize-vertical"
                rows={4}
                placeholder="Enter maintenance or status message..."
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="py-3 px-6 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Message'}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}