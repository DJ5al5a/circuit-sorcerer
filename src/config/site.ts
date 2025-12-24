/**
 * Site Configuration
 * Central place for all site metadata and author information
 */

export const siteConfig = {
  name: 'Circuit Sorcerer',
  url: 'https://circuitsorcerer.us.kg',
  description:
    'Portfolio of a self-taught infrastructure engineer and security enthusiast passionate about self-hosting, automation, and building resilient systems.',
  tagline: 'Blending Technology with Digital Mastery',

  author: {
    name: 'Circuit Sorcerer',
    title: 'Infrastructure Engineer & Security Enthusiast',
    bio: 'Self-taught technology enthusiast specializing in AI prompting, self-hosted infrastructure, and cybersecurity. Passionate about building and automating systems to reduce costs.',
    bioExtended: 'I am passionate about building robust, self-hosted infrastructure that prioritizes privacy, security, and complete control. From containerized applications to network security, I love exploring the full stack of modern DevOps and cybersecurity practices.',
    avatar: '/sorcerer.jpeg',
    email: 'contact@circuitsorcerer.us.kg',
    discord: 'circuitsorcerer#0000',

    // Social Links
    social: {
      github: 'https://github.com/circuitsorcerer',
      linkedin: 'https://linkedin.com/in/circuitsorcerer',
      twitter: 'https://x.com/circuitsorcerer',
    },

    // Platform Links
    platforms: {
      tryhackme: {
        url: 'https://tryhackme.com/p/YOUR_USERNAME',
        publicId: 'YOUR_PUBLIC_ID', // For iframe embed
      },
      hackthebox: {
        url: 'https://app.hackthebox.com/profile/YOUR_ID',
        badgeId: 'YOUR_HTB_ID', // For badge image
      },
    },

    // Stats (update these with your actual numbers)
    stats: {
      selfHostedServices: 15,
      yearsExperience: 3,
      githubRepos: 25,
    },
  },

  // Navigation
  nav: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Emby', href: '/emby' },
    { name: 'Support', href: '/support' },
    { name: 'Contact', href: '/contact' },
  ],

  // Footer Links
  footerNav: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Emby', href: '/emby' },
    { name: 'Support', href: '/support' },
    { name: 'Contact', href: '/contact' },
  ],

  // Tech Credits
  builtWith: [
    'Next.js 15',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Docker',
  ],

  hosting: {
    platform: 'Proxmox',
    security: 'Cloudflare',
  },
}

export type SiteConfig = typeof siteConfig
