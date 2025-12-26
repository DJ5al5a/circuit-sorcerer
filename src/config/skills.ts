/**
 * Skills & Certifications Configuration
 */

export type SkillCategory = 'infrastructure' | 'security' | 'ai'

export interface Skill {
  name: string
  category: SkillCategory
  icon?: string // Icon name from lucide-react or custom
}

export interface Certification {
  name: string
  issuer: string
  year: number | 'In Progress' | 'Planned'
  logo?: string
  link?: string
  status: 'completed' | 'in-progress' | 'planned'
}

export const skills: Skill[] = [
  // Infrastructure
  { name: 'Docker', category: 'infrastructure' },
  { name: 'Proxmox', category: 'infrastructure' },
  { name: 'Linux Administration', category: 'infrastructure' },
  { name: 'Nginx', category: 'infrastructure' },
  { name: 'Caddy', category: 'infrastructure' },
  { name: 'Synology NAS', category: 'infrastructure' },
  { name: 'Self-Hosting', category: 'infrastructure' },
  { name: 'Networking', category: 'infrastructure' },

  // Security
  { name: 'BurpSuite', category: 'security' },
  { name: 'Nmap', category: 'security' },
  { name: 'Nuclei', category: 'security' },
  { name: 'Metasploit', category: 'security' },
  { name: 'ffuf', category: 'security' },
  { name: 'httpx', category: 'security' },
  { name: 'Web Application Security', category: 'security' },
  { name: 'Vulnerability Assessment', category: 'security' },
  { name: 'Penetration Testing', category: 'security' },

  // AI
  { name: 'AI Prompting', category: 'ai' },
  { name: 'AI Engineering', category: 'ai' },
  { name: 'LLM Integration', category: 'ai' },
]

export const certifications: Certification[] = [
  {
    name: 'TryHackMe Pre-Security',
    issuer: 'TryHackMe',
    year: 2023,
    status: 'completed',
    link: 'https://tryhackme.com/p/bobthebum21',
  },
  {
    name: 'Advent of Cyber 2025',
    issuer: 'TryHackMe',
    year: 2025,
    status: 'completed',
    link: 'https://tryhackme.com/p/bobthebum21',
  },
  {
    name: 'Nmap Hands-On',
    issuer: 'Udemy',
    year: 2024,
    status: 'completed',
  },
  {
    name: 'eJPT',
    issuer: 'eLearnSecurity',
    year: 'Planned',
    status: 'planned',
    link: 'https://security.ine.com/certifications/ejpt-certification/',
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    year: 'Planned',
    status: 'planned',
    link: 'https://www.comptia.org/certifications/security',
  },
]

// Helper functions
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category)
}

export function getCertificationsByStatus(
  status: 'completed' | 'in-progress' | 'planned'
): Certification[] {
  return certifications.filter((cert) => cert.status === status)
}
