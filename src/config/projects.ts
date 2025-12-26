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
    title: 'Multi-Machine Homelab',
    description:
      'Custom-built homelab infrastructure with Synology NAS, OpenWRT router, and Raspberry Pi running Docker containers, network services, and security tools.',
    problem:
      'Created multi-tier testing environment for security research, self-hosted services, and continuous learning without cloud costs.',
    image: '/projects/homelab-network.png',
    category: 'infrastructure',
    tags: ['Synology NAS', 'Docker', 'OpenWRT', 'Raspberry Pi', 'Pi-hole', 'Tailscale'],
    links: {
      github: 'https://github.com/circuitsorcerer/homelab',
      docs: 'https://github.com/circuitsorcerer/homelab/wiki',
    },
    featured: true,
  },
  {
    id: 'media-server',
    title: 'Emby Media Server',
    description:
      'Self-hosted Emby media server providing Netflix-like streaming to family and friends across all devices.',
    problem:
      'Centralized media library with high-quality streaming, user management, and complete privacy control without subscription fees.',
    image: '/projects/media-server.png',
    category: 'services',
    tags: ['Emby', 'Intel i5', 'Docker', 'Nginx', 'Reverse Proxy'],
    links: {
      github: 'https://github.com/circuitsorcerer/media-server-config',
      demo: '/emby',
    },
    featured: true,
  },
  {
    id: 'self-hosted-sites',
    title: 'Self-Hosted Web Infrastructure',
    description:
      'Custom Nginx web server on Synology NAS hosting multiple sites including advocacy platform (familyandfriendoutreach.com) and personal portfolio (circuitsorcerer.us.kg).',
    problem:
      'Full control over hosting, security, and performance without relying on managed platforms or subscription services.',
    image: '/projects/web-hosting.png',
    category: 'infrastructure',
    tags: ['Next.js', 'Nginx', 'Synology NAS', 'Cloudflare', 'Static Sites'],
    links: {
      github: 'https://github.com/dj5al5a/circuit-sorcerer',
      demo: 'https://circuitsorcerer.us.kg',
      docs: 'https://familyandfriendoutreach.com',
    },
    featured: true,
  },
  {
    id: 'vpn-network',
    title: 'Tailscale VPN Mesh Network',
    description:
      'Zero-config VPN mesh network using Tailscale for secure remote access to homelab services from anywhere.',
    problem:
      'Secure, encrypted access to home network and self-hosted services without complex firewall rules or port forwarding.',
    image: '/projects/vpn-architecture.png',
    category: 'security',
    tags: ['Tailscale', 'VPN', 'Docker', 'Synology NAS', 'Zero Trust'],
    links: {},
    featured: false,
  },
  {
    id: 'cloud-server',
    title: 'Private Cloud Storage',
    description:
      'Self-hosted cloud storage on Synology NAS with file sync, photo backup, and encrypted remote access via Tailscale.',
    problem:
      'Complete data ownership and privacy without relying on third-party cloud providers like Google Drive or Dropbox.',
    image: '/projects/cloud-storage.png',
    category: 'services',
    tags: ['Nextcloud', 'Synology NAS', 'Docker', 'Tailscale', 'Encryption'],
    links: {},
    featured: false,
  },
  {
    id: 'n8n-automation',
    title: 'n8n Workflow Automation',
    description:
      'Self-hosted automation platform running in Docker for connecting services, handling notifications, and managing backups.',
    problem:
      'Automate repetitive tasks, integrate services, and create custom workflows without vendor lock-in or subscription fees.',
    image: '/projects/n8n-workflows.png',
    category: 'automation',
    tags: ['n8n', 'Docker', 'Synology NAS', 'Webhooks', 'API Integration'],
    links: {
      github: 'https://github.com/circuitsorcerer/n8n-workflows',
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
    featured: false,
  },
  {
    id: 'pi-security-lab',
    title: 'Raspberry Pi Security Lab',
    description:
      'Raspberry Pi 3 B+ configured as network security testing platform with Pi-hole ad blocking, Pwnagotchi WiFi auditing, and pentesting tools.',
    problem:
      'Dedicated low-power device for network security research, DNS filtering, and WiFi security testing without impacting main systems.',
    image: '/projects/pi-security.png',
    category: 'security',
    tags: ['Raspberry Pi', 'Pi-hole', 'Pwnagotchi', 'Security Testing', 'DNS'],
    links: {
      github: 'https://github.com/circuitsorcerer/pi-security-lab',
    },
    featured: true,
  },
  {
    id: 'retropie-gaming',
    title: 'RetroPie Gaming Station',
    description:
      'Custom-built retro gaming station on Raspberry Pi running RetroPie with classic games for family entertainment.',
    problem:
      'Created nostalgia gaming experience for son with classic games, custom controllers, and safe, ad-free entertainment.',
    image: '/projects/retropie-gaming.png',
    category: 'services',
    tags: ['Raspberry Pi', 'RetroPie', 'Gaming', 'Emulation', 'Family Projects'],
    links: {},
    featured: false,
  },
  {
    id: 'music-streaming',
    title: 'Music Streaming Server',
    description:
      'Self-hosted music streaming server (coming soon) for personal music library with multi-device access.',
    problem:
      'Stream personal music collection without relying on subscription services like Spotify.',
    image: '/projects/music-streaming.png',
    category: 'services',
    tags: ['Music Streaming', 'Docker', 'Self-Hosting'],
    links: {},
    featured: false,
  },
  {
    id: 'local-wiki',
    title: 'Documentation Wiki',
    description:
      'Self-hosted wiki using BookStack or DokuWiki for organizing homelab documentation, notes, and technical references.',
    problem:
      'Centralized knowledge base for documenting configurations, troubleshooting steps, and learning notes.',
    image: '/projects/wiki.png',
    category: 'services',
    tags: ['BookStack', 'DokuWiki', 'Documentation', 'Docker', 'Knowledge Management'],
    links: {},
    featured: false,
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
