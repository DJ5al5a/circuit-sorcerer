/**
 * Skills & Certifications Configuration
 */

export type SkillCategory = 'languages' | 'frameworks' | 'infrastructure' | 'security' | 'devops'

export interface Skill {
  name: string
  level: number // 0-100
  category: SkillCategory
  icon?: string // Icon name from lucide-react or custom
  glowColor: 'cyan' | 'green' | 'gold' | 'purple' | 'crimson'
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
  // Languages
  {
    name: 'Python',
    level: 85,
    category: 'languages',
    glowColor: 'cyan',
  },
  {
    name: 'Bash/Shell',
    level: 90,
    category: 'languages',
    glowColor: 'cyan',
  },
  {
    name: 'JavaScript',
    level: 75,
    category: 'languages',
    glowColor: 'cyan',
  },
  {
    name: 'TypeScript',
    level: 70,
    category: 'languages',
    glowColor: 'cyan',
  },

  // Frameworks
  {
    name: 'Next.js',
    level: 80,
    category: 'frameworks',
    glowColor: 'cyan',
  },
  {
    name: 'React',
    level: 75,
    category: 'frameworks',
    glowColor: 'cyan',
  },
  {
    name: 'Tailwind CSS',
    level: 85,
    category: 'frameworks',
    glowColor: 'cyan',
  },

  // Infrastructure
  {
    name: 'Proxmox',
    level: 90,
    category: 'infrastructure',
    glowColor: 'green',
  },
  {
    name: 'Docker',
    level: 95,
    category: 'infrastructure',
    glowColor: 'green',
  },
  {
    name: 'Kubernetes',
    level: 65,
    category: 'infrastructure',
    glowColor: 'green',
  },
  {
    name: 'Linux Administration',
    level: 90,
    category: 'infrastructure',
    glowColor: 'green',
  },
  {
    name: 'Nginx/Caddy',
    level: 85,
    category: 'infrastructure',
    glowColor: 'green',
  },

  // Security
  {
    name: 'Penetration Testing',
    level: 70,
    category: 'security',
    glowColor: 'crimson',
  },
  {
    name: 'Network Security',
    level: 75,
    category: 'security',
    glowColor: 'crimson',
  },
  {
    name: 'Web Application Security',
    level: 65,
    category: 'security',
    glowColor: 'crimson',
  },
  {
    name: 'Vulnerability Assessment',
    level: 70,
    category: 'security',
    glowColor: 'crimson',
  },

  // DevOps
  {
    name: 'Git/GitHub',
    level: 90,
    category: 'devops',
    glowColor: 'green',
  },
  {
    name: 'CI/CD',
    level: 75,
    category: 'devops',
    glowColor: 'green',
  },
  {
    name: 'n8n Automation',
    level: 85,
    category: 'devops',
    glowColor: 'green',
  },
  {
    name: 'Monitoring & Logging',
    level: 70,
    category: 'devops',
    glowColor: 'green',
  },
]

export const certifications: Certification[] = [
  {
    name: 'OSCP',
    issuer: 'Offensive Security',
    year: 'In Progress',
    status: 'in-progress',
    link: 'https://www.offensive-security.com/pwk-oscp/',
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

export function getTopSkills(limit: number = 10): Skill[] {
  return [...skills].sort((a, b) => b.level - a.level).slice(0, limit)
}

export function getCertificationsByStatus(
  status: 'completed' | 'in-progress' | 'planned'
): Certification[] {
  return certifications.filter((cert) => cert.status === status)
}
