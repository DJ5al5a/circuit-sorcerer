/**
 * Projects Configuration
 * Your self-hosted infrastructure showcase
 */

export type ProjectCategory = 'infrastructure' | 'services' | 'security' | 'automation'

export interface Project {
  id: string
  title: string
  description: string
  problem: string // Why you built it
  image: string
  category: ProjectCategory
  tags: string[] // Tech stack
  links: {
    github?: string
    docs?: string
    demo?: string
  }
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'homelab',
    title: 'Home Lab Setup',
    description:
      'Enterprise-grade home lab built on Proxmox for continuous learning and experimentation.',
    problem:
      'Created isolated testing environment for security research and service deployment without cloud costs.',
    image: '/projects/homelab-network.png',
    category: 'infrastructure',
    tags: ['Proxmox', 'Docker', 'pfSense', 'TrueNAS', 'Virtualization'],
    links: {
      github: 'https://github.com/circuitsorcerer/homelab',
      docs: 'https://github.com/circuitsorcerer/homelab/wiki',
    },
    featured: true,
  },
  {
    id: 'media-server',
    title: 'Media Server',
    description:
      'Self-hosted media streaming solution accessible from anywhere with automatic organization.',
    problem:
      'Centralized media library with streaming capability while maintaining complete control and privacy.',
    image: '/projects/media-server.png',
    category: 'services',
    tags: ['Plex', 'Jellyfin', 'Docker', 'Nginx', 'Reverse Proxy'],
    links: {
      github: 'https://github.com/circuitsorcerer/media-server-config',
    },
    featured: true,
  },
  {
    id: 'self-hosted-sites',
    title: 'Self-Hosted Websites',
    description:
      'Complete web hosting infrastructure for personal and family sites with automated deployments.',
    problem:
      'Full control over hosting, security, and performance without relying on managed platforms.',
    image: '/projects/web-hosting.png',
    category: 'infrastructure',
    tags: ['Next.js', 'Docker', 'Nginx', 'Caddy', 'Cloudflare', 'CI/CD'],
    links: {
      github: 'https://github.com/circuitsorcerer/portfolio',
      demo: 'https://circuitsorcerer.us.kg',
    },
    featured: true,
  },
  {
    id: 'vpn-network',
    title: 'VPN Network',
    description:
      'Secure remote access infrastructure for home lab and services from anywhere in the world.',
    problem:
      'Safe and encrypted connection to home network for remote administration and service access.',
    image: '/projects/vpn-architecture.png',
    category: 'security',
    tags: ['WireGuard', 'OpenVPN', 'pfSense', 'Docker', 'Network Security'],
    links: {
      github: 'https://github.com/circuitsorcerer/vpn-setup',
      docs: 'https://github.com/circuitsorcerer/vpn-setup/blob/main/README.md',
    },
    featured: false,
  },
  {
    id: 'cloud-server',
    title: 'Private Cloud Storage',
    description:
      'Self-hosted cloud storage solution for files, photos, and backups with end-to-end encryption.',
    problem:
      'Complete data ownership and privacy without relying on third-party cloud providers.',
    image: '/projects/cloud-storage.png',
    category: 'services',
    tags: ['Nextcloud', 'Seafile', 'Docker', 'PostgreSQL', 'Encryption'],
    links: {
      github: 'https://github.com/circuitsorcerer/cloud-setup',
    },
    featured: false,
  },
  {
    id: 'n8n-automation',
    title: 'n8n Workflow Automation',
    description:
      'Powerful automation platform for connecting services, handling notifications, and managing backups.',
    problem:
      'Automate repetitive tasks, integrate services, and create custom workflows without vendor lock-in.',
    image: '/projects/n8n-workflows.png',
    category: 'automation',
    tags: ['n8n', 'Docker', 'PostgreSQL', 'Webhooks', 'API Integration'],
    links: {
      github: 'https://github.com/circuitsorcerer/n8n-workflows',
      docs: 'https://github.com/circuitsorcerer/n8n-workflows/tree/main/workflows',
    },
    featured: true,
  },
  {
    id: 'llm-setup',
    title: 'Self-Hosted LLM',
    description:
      'Private AI assistant powered by Ollama and Open WebUI for coding assistance and research.',
    problem:
      'Run large language models locally for privacy, offline access, and complete data control.',
    image: '/projects/llm-setup.png',
    category: 'services',
    tags: ['Ollama', 'Open WebUI', 'Docker', 'LLaMA', 'AI/ML'],
    links: {
      github: 'https://github.com/circuitsorcerer/llm-setup',
    },
    featured: true,
  },
]

// Filter helpers
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
