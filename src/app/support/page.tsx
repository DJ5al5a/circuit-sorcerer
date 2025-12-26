'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { supportData } from '@/config/support'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerFast } from '@/lib/animations'
import { Heart, ExternalLink, Copy, Coffee, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function SupportPage() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
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
            Support
          </motion.h1>

          <motion.div
            className="max-w-4xl mx-auto space-y-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Support Message */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-electric-cyan" />
                <h2 className="font-display text-2xl font-bold text-electric-cyan">Support My Work</h2>
              </div>
              <p className="text-text-secondary leading-relaxed">{supportData.message}</p>
            </motion.div>

            {/* Donations */}
            <motion.div
              className="space-y-6"
              variants={staggerFast}
              initial="hidden"
              animate="visible"
            >
              <h2 className="font-display text-3xl font-bold text-electric-cyan text-center">Ways to Support</h2>

              {/* Buy Me a Coffee and Amazon */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={fadeInUp}
              >
                {supportData.donations.map((donation, index) => (
                  <motion.a
                    key={index}
                    href={donation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-shadow rounded-lg p-6 border border-electric-cyan/20 hover:border-electric-cyan/50 transition-colors group"
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {donation.name === 'Buy Me a Coffee' ? (
                        <Coffee className="h-6 w-6 text-electric-cyan" />
                      ) : (
                        <ShoppingCart className="h-6 w-6 text-electric-cyan" />
                      )}
                      <h3 className="font-semibold text-arcane-gold">{donation.name}</h3>
                      <ExternalLink className="h-4 w-4 text-text-secondary group-hover:text-electric-cyan transition-colors" />
                    </div>
                    <p className="text-text-secondary text-sm">{donation.description}</p>
                  </motion.a>
                ))}
              </motion.div>

              {/* Crypto */}
              <motion.div
                className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
                variants={fadeInUp}
              >
                <h3 className="font-display text-2xl font-bold text-electric-cyan mb-6 text-center">Cryptocurrency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportData.crypto.map((crypto, index) => (
                    <div key={index} className="bg-shadow rounded-lg p-4 border border-electric-cyan/20">
                      <h4 className="font-semibold text-arcane-gold mb-2">{crypto.name}</h4>
                      <p className="text-text-secondary text-sm mb-3 break-all">{crypto.address}</p>
                      <button
                        onClick={() => copyToClipboard(crypto.address)}
                        className="w-full py-2 bg-electric-cyan text-void font-semibold rounded hover:bg-electric-cyan/80 transition-colors flex items-center justify-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        {copiedAddress === crypto.address ? 'Copied!' : 'Copy Address'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
