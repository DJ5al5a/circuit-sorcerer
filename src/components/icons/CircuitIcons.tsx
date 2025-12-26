/**
 * Circuit Sorcerer - Custom Circuit Board Icon Components
 * Original tech/industrial design elements
 */

import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

// Microchip Icon - For Hero Section
export function MicrochipIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4" />
      <path d="M15 2v4" />
      <path d="M9 18v4" />
      <path d="M15 18v4" />
      <path d="M2 9h4" />
      <path d="M2 15h4" />
      <path d="M18 9h4" />
      <path d="M18 15h4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

// Circuit Node Icon - For About/Stats Modules
export function CircuitNodeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      <circle cx="12" cy="21" r="1" fill="currentColor" />
      <circle cx="3" cy="12" r="1" fill="currentColor" />
      <circle cx="21" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// Timeline Icon - For Experience Section
export function TimelineIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 12h18" />
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
      <path d="M6 8v8" opacity="0.5" />
      <path d="M18 8v8" opacity="0.5" />
    </svg>
  )
}

// Component Grid Icon - For Projects Section
export function ComponentGridIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <circle cx="6.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="17.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

// Terminal Icon - For Contact Section
export function TerminalIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <path d="M13 15h4" />
      <circle cx="5" cy="7" r="0.5" fill="currentColor" />
      <circle cx="7" cy="7" r="0.5" fill="currentColor" />
      <circle cx="9" cy="7" r="0.5" fill="currentColor" />
    </svg>
  )
}

// Network Icon - For Social Links Module
export function NetworkIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 7l6 4" opacity="0.5" />
      <path d="M16 7l-6 4" opacity="0.5" />
      <path d="M8 17l6-4" opacity="0.5" />
      <path d="M16 17l-6-4" opacity="0.5" />
    </svg>
  )
}

// Status Indicator Icon - For Availability Module
export function StatusIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 2v4" opacity="0.3" />
      <path d="M12 18v4" opacity="0.3" />
      <path d="M2 12h4" opacity="0.3" />
      <path d="M18 12h4" opacity="0.3" />
    </svg>
  )
}
