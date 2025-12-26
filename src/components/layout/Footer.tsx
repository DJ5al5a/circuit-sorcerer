import { siteConfig } from '@/config/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 text-center border-t border-border bg-surface">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-text-tertiary text-sm">
          <span>Built with {siteConfig.builtWith.join(' • ')}</span>
          <span className="hidden md:inline">•</span>
          <span>Self-Hosted on {siteConfig.hosting.platform}</span>
          <span className="hidden md:inline">•</span>
          <span>© {currentYear} {siteConfig.author.name}</span>
        </div>
      </div>
    </footer>
  )
}
