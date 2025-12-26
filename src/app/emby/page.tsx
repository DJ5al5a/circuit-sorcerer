'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { embyData } from '@/config/emby'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useState, useEffect } from 'react'
import { Monitor, AlertCircle, CheckCircle, XCircle, ExternalLink, Smartphone, Tv, Tablet, Laptop } from 'lucide-react'

type StatusType = 'up' | 'maintenance' | 'down'

export default function EmbyPage() {
  const [serverStatus, setServerStatus] = useState<StatusType>('up')
  const [statusMessage, setStatusMessage] = useState('')

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

            {/* Request Access */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-2xl font-bold text-electric-cyan mb-6">Request Access</h2>
              <p className="text-text-secondary mb-6">
                Don't have an account? Send a request to get access to the Emby server.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:mjm.itguy@gmail.com?subject=Emby Server Access Request&body=Hi,%0D%0A%0D%0AI would like to request access to your Emby server.%0D%0A%0D%0AName:%0D%0AEmail:%0D%0AReason for access:%0D%0A%0D%0AThank you!"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan font-semibold rounded hover:bg-electric-cyan/20 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Email Request
                </a>
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan font-semibold rounded hover:bg-electric-cyan/20 transition-colors"
                >
                  Contact Form
                </a>
              </div>
              <div className="mt-6 p-4 bg-void rounded border border-electric-cyan/20">
                <p className="text-text-secondary text-sm">
                  Include your name, email, and reason for wanting access. Requests are typically reviewed within 24-48 hours.
                </p>
              </div>
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
