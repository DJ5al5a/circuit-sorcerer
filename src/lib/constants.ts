/**
 * Site-wide constants for Circuit Sorcerer portfolio
 * Centralized configuration values
 */

// Animation Durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  verySlow: 2.0,
} as const

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Neon Colors (Circuit Sorcerer theme)
export const NEON_COLORS = {
  electricCyan: '#00ffff',
  circuitGreen: '#39ff14',
  neonBlue: '#0080ff',
  arcaneGold: '#ffd700',
  mysticPurple: '#8b00ff',
  voidViolet: '#6a0dad',
  plasmaMagenta: '#ff00aa',
  lightning: '#fff44f',
  crimsonSpark: '#ff1744',
} as const

// Social Media Links (placeholders - to be updated)
export const SOCIAL_LINKS = {
  github: 'https://github.com/circuitsorcerer',
  linkedin: 'https://linkedin.com/in/circuitsorcerer',
  twitter: 'https://x.com/circuitsorcerer',
  discord: 'circuitsorcerer#0000',
  email: 'contact@circuitsorcerer.us.kg',
} as const

// External Platform Links
export const PLATFORM_LINKS = {
  tryhackme: 'https://tryhackme.com/p/YOUR_USERNAME', // Update with actual username
  hackthebox: 'https://app.hackthebox.com/profile/YOUR_ID', // Update with actual ID
} as const

// Site Metadata
export const SITE_METADATA = {
  title: 'Circuit Sorcerer | Self-Hosted Infrastructure & Security',
  description:
    'Portfolio of a self-taught infrastructure engineer passionate about self-hosting, automation, and cybersecurity. Explore my home lab, projects, and technical journey.',
  keywords: [
    'self-hosting',
    'home lab',
    'proxmox',
    'docker',
    'cybersecurity',
    'infrastructure',
    'automation',
    'n8n',
    'penetration testing',
  ],
  author: 'Circuit Sorcerer',
  siteUrl: 'https://circuitsorcerer.us.kg',
  ogImage: '/og-image.png', // Create this image
} as const

// Navigation Menu Items
export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Blog', href: '/blog' },
  { name: 'Support', href: '/support' },
  { name: 'Contact', href: '/contact' },
] as const

// Project Categories
export const PROJECT_CATEGORIES = {
  infrastructure: 'Infrastructure',
  services: 'Services',
  security: 'Security',
  automation: 'Automation',
} as const

// Skill Proficiency Levels
export const SKILL_LEVELS = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 90,
  master: 100,
} as const

// Tech Stack Icons (for badges)
export const TECH_STACK = {
  // Infrastructure
  proxmox: 'Proxmox',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  linux: 'Linux',
  nginx: 'Nginx',
  caddy: 'Caddy',

  // Languages
  python: 'Python',
  bash: 'Bash',
  javascript: 'JavaScript',
  typescript: 'TypeScript',

  // Frameworks
  nextjs: 'Next.js',
  react: 'React',
  tailwind: 'Tailwind CSS',

  // Databases
  postgresql: 'PostgreSQL',
  redis: 'Redis',

  // Tools
  git: 'Git',
  n8n: 'n8n',
  vscode: 'VS Code',

  // Security
  kali: 'Kali Linux',
  burpsuite: 'Burp Suite',
  metasploit: 'Metasploit',
  wireshark: 'Wireshark',
} as const

// Roadmap Status Types
export const ROADMAP_STATUS = {
  planned: { label: 'Planned', color: 'electric-cyan', icon: '📋' },
  inProgress: { label: 'In Progress', color: 'arcane-gold', icon: '🟡' },
  completed: { label: 'Completed', color: 'circuit-green', icon: '✅' },
  continuous: { label: 'Continuous', color: 'mystic-purple', icon: '🔄' },
  goal: { label: 'Future Goal', color: 'void-violet', icon: '💭' },
} as const

// Contact Form Fields
export const CONTACT_FIELDS = {
  name: { label: 'Name', type: 'text', required: true },
  email: { label: 'Email', type: 'email', required: true },
  discord: { label: 'Discord (Optional)', type: 'text', required: false },
  message: { label: 'Message', type: 'textarea', required: true },
} as const

// Support/Donation Options
export const SUPPORT_OPTIONS = {
  buyMeACoffee: 'https://buymeacoffee.com/circuitsorcerer',
  kofi: 'https://ko-fi.com/circuitsorcerer',
  patreon: 'https://patreon.com/circuitsorcerer',
  amazonWishlist: 'https://www.amazon.com/hz/wishlist/ls/YOUR_LIST_ID',
  crypto: {
    btc: 'YOUR_BTC_ADDRESS',
    eth: 'YOUR_ETH_ADDRESS',
    xmr: 'YOUR_MONERO_ADDRESS',
  },
} as const

// Blog Categories
export const BLOG_CATEGORIES = {
  ctf: 'CTF Write-Ups',
  infrastructure: 'Infrastructure Guides',
  security: 'Security Research',
  automation: 'Automation Tips',
  tutorials: 'Tutorials',
} as const

// Pagination
export const PAGINATION = {
  projectsPerPage: 9,
  blogPostsPerPage: 10,
} as const
