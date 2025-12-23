/**
 * Shared TypeScript Types
 */

export interface NavItem {
  name: string
  href: string
  external?: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Metadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}

export type ThemeMode = 'light' | 'dark'

export type AnimationVariant = 'fadeIn' | 'slideUp' | 'scaleUp' | 'glitch'

export interface PageProps {
  params: Promise<{ [key: string]: string | string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export interface LayoutProps {
  children: React.ReactNode
  params?: Promise<{ [key: string]: string | string[] }>
}
