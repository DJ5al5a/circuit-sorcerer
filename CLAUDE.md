# Circuit Sorcerer Portfolio - Project Context

## Project Overview

Personal portfolio website for Mike (Circuit Sorcerer) - showcasing homelab infrastructure, security skills, and projects.

**Live Site:** https://circuitsorcerer.us.kg
**GitHub:** https://github.com/DJ5al5a/circuit-sorcerer
**NAS Deployment:** 192.168.1.104:/volume1/web/CS/ (SSH port 6969, user: dad)

## Tech Stack

- **Framework:** Next.js 16.1.0 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Deployment:** Static export to Synology NAS
- **Hosting:** Nginx web server on Synology NAS

## Design System

### Theme: Dark Industrial / Tech Command Center

**Colors:**
- Background: Deep charcoal/black (#0a0a0a, #111111)
- Primary: Electric blue (#00d4ff) - tech/circuitry
- Accent: Amber/gold (#ffaa00) - warning lights
- Success: Green (#00ff88) - terminal/status
- Borders: Steel gray (#2a2a2a, #3a3a3a)

**Visual Elements:**
- Dashboard card-based layout
- Circuit node icons (from Lucide React)
- sorcerer.jpeg background image (fixed, opacity 30%, brightness 40%)
- Tech labels (uppercase, monospace font)
- Subtle hover glows on interactive elements

### Component Architecture

**Dashboard Components** (`src/components/dashboard/`):
- `HeroDashboard.tsx` - Main hero panel
- `AboutModule.tsx` - About card
- `StatsModule.tsx` - Statistics dashboard
- `QuickLinksModule.tsx` - Social links card
- `ExperienceTimeline.tsx` - Homelab experience timeline
- `ExperienceCard.tsx` - Individual experience item
- `FeaturedProjectCard.tsx` - Large project cards
- `ProjectsGrid.tsx` - All projects grid
- `ContactModule.tsx` - Contact form/email
- `SocialLinksModule.tsx` - Social icons
- `AvailabilityModule.tsx` - Status indicator

**Icons** (`src/components/icons/`):
- `CircuitIcons.tsx` - Custom circuit node SVG icons

**Layout** (`src/components/layout/`):
- `Navigation.tsx` - Fixed navbar (z-50, h-16 md:h-20)
- `Footer.tsx` - Simple footer (NO Brittany Chiang credit)

## Site Structure

### Pages
1. **Homepage** (`/`) - Dashboard with hero, stats, experience, projects
2. **About** (`/about`) - Bio, skills (tag cloud), certifications
3. **Projects** (`/projects`) - Filterable project grid
4. **Contact** (`/contact`) - Contact info and social links
5. **Resume** (`/resume`) - Formal resume/CV
6. **Roadmap** (`/roadmap`) - Learning goals and future plans
7. **Emby** (`/emby`) - Emby media server info
8. **Support** (`/support`) - Donation/support options

### Skills Configuration (`src/config/skills.ts`)

**Categories:**
- **Infrastructure:** Docker, Proxmox, Linux, Nginx, Caddy, Synology NAS, Self-Hosting, Networking
- **Security:** BurpSuite, Nmap, Nuclei, Metasploit, ffuf, httpx, Web App Security, Vuln Assessment, Pentesting
- **AI:** AI Prompting, AI Engineering, LLM Integration

**Display Format:** Tag cloud with color-coded categories (no percentages)

**Certifications:**
- TryHackMe Pre-Security (2023, completed)
- Advent of Cyber 2025 (2025, completed)
- Nmap Hands-On - Udemy (2024, completed)
- eJPT - eLearnSecurity (planned)
- CompTIA Security+ (planned)

## Contact Information

**Primary Email:** mjm.itguy@gmail.com
**Secondary Email:** contact@circuitsorcerer.us.kg
**Discord:** bobthebum45
**GitHub:** https://github.com/DJ5al5a
**TryHackMe:** https://tryhackme.com/p/bobthebum21

**Social Links:**
- GitHub: DJ5al5a
- Discord: bobthebum45
- NO LinkedIn
- NO Twitter

## Important Project Details

### Background & History

**Original Design:** Heavily based on Brittany Chiang's portfolio template
**Redesign Date:** December 2025
**Goal:** Create completely unique design - dark industrial/tech theme

**Major Redesign Changes:**
- Removed numbered sections (01., 02., etc.) - Brittany's signature element
- Changed from linear scroll to dashboard card layout
- Added circuit node icons instead of minimal design
- Implemented dark industrial color palette
- Removed all credits to Brittany Chiang from footer
- Changed from fantasy theme ("Arcane Abilities") to professional tech theme

### Removed Features
- ❌ Admin panel (`/src/app/admin/`) - completely deleted
- ❌ Kubernetes from skills (not actually used)
- ❌ LinkedIn integration (no LinkedIn account)
- ❌ Twitter integration (removed)
- ❌ Progress bars and skill percentages (replaced with tag cloud)

### Navigation Structure

**Important:** All pages need proper spacing after navbar to prevent overlap

```tsx
<>
  <Navigation />
  <div className="h-24"></div>  {/* REQUIRED - prevents navbar overlap */}
  <main className="min-h-screen relative flex justify-center">
    {/* Background Image */}
    <div className="fixed inset-0 bg-cover bg-center opacity-30 -z-10"
      style={{ backgroundImage: 'url(/sorcerer.jpeg)', filter: 'brightness(0.4)' }} />
    <div className="fixed inset-0 bg-background/80 -z-10" />

    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Page content */}
    </div>
  </main>
  <Footer />
</>
```

## Build & Deployment

### Local Development
```bash
npm run dev        # Development server at http://localhost:3000
npm run build      # Production build
npm run start      # Start production server
```

### Deployment Process

**1. Build:**
```bash
npm run build
```
- Creates static export in `out/` folder
- Removes admin routes automatically
- Builds all 8 pages (no admin)

**2. Deploy to NAS:**
```bash
tar czf - -C out . | ssh -p 6969 dad@192.168.1.104 "cd /volume1/web/CS && rm -rf * && tar xzf -"
```

**SSH Details:**
- Host: 192.168.1.104
- Port: 6969 (NOT standard 22)
- User: dad
- Path: /volume1/web/CS/

**3. Push to GitHub:**
```bash
git add -A
git commit -m "Your message"
git push origin main
```

### Important Configuration

**next.config.ts:**
```typescript
const nextConfig: NextConfig = {
  output: 'export',  // REQUIRED for static deployment
  images: {
    unoptimized: true,  // REQUIRED for static export
  },
};
```

**Without `output: 'export'`, the build won't create `out/` folder!**

## Projects Configuration (`src/config/projects.ts`)

### Featured Projects

**Self-Hosted Web Infrastructure:**
- Sites: circuitsorcerer.us.kg AND familyandfriendoutreach.com
- Links: GitHub, Demo (circuitsorcerer), Docs (familyandfriendoutreach)

**FAFO Website (Friends and Family Outreach):**
- Advocacy site for Florida DCF families
- Static HTML/CSS/JS
- Deployed to NAS

**Emby Media Server:**
- Self-hosted on Intel machine
- Link to familyandfriendoutreach.com

### Project Categories
- Infrastructure
- Services
- Security
- Automation

## Design Patterns

### Dashboard Cards
```css
.dashboard-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  border-color: var(--primary);
  box-shadow: var(--glow-blue);
  transform: translateY(-2px);
}
```

### Tech Labels
```css
.tech-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

## Troubleshooting

### Common Issues

**1. Navbar overlaps content**
- **Solution:** Add `<div className="h-24"></div>` after `<Navigation />`

**2. No `out/` folder after build**
- **Solution:** Check `next.config.ts` has `output: 'export'`

**3. SSH connection refused**
- **Solution:** Use port 6969, not 22: `ssh -p 6969 dad@192.168.1.104`

**4. rsync fails**
- **Solution:** Use tar pipe method (shown in deployment section)

**5. Old admin panel still showing**
- **Solution:** Rebuild fresh (`rm -rf out .next && npm run build`)

## Files & Directories

### Archive
`/archive/` - Old design backups and documentation
- `builds/` - Tarball backups
- `docs/` - Old project docs (AGENTS.md, etc.)

### Important Files
- `CLAUDE.md` - This file (project context)
- `REDESIGN-PLAN.md` - Complete redesign documentation
- `next.config.ts` - Next.js configuration (static export)
- `tailwind.config.ts` - Tailwind CSS v4 config
- `src/app/globals.css` - Global styles and CSS variables
- `src/config/site.ts` - Site metadata and contact info
- `src/config/skills.ts` - Skills and certifications
- `src/config/projects.ts` - Projects data

### Public Assets
- `/public/sorcerer.jpeg` - Main background image
- `/public/laptop_logo.jpeg` - Logo/avatar
- `/public/circuitsorcerer.png` - Site thumbnail
- `/public/grok-video-*.mp4` - Demo video

## Development Notes

### What NOT to Do
- ❌ Don't add LinkedIn (no account)
- ❌ Don't add Twitter (removed)
- ❌ Don't add progress bars/percentages (using tag cloud)
- ❌ Don't add skill levels (honest display only)
- ❌ Don't add fantasy theme elements ("Arcane", "Quest", etc.)
- ❌ Don't credit Brittany Chiang in footer
- ❌ Don't add admin panel back

### What to Maintain
- ✅ Tag cloud skills display
- ✅ Dashboard card layout
- ✅ Circuit icons throughout
- ✅ Dark industrial theme
- ✅ sorcerer.jpeg background
- ✅ Proper navbar spacing (h-24)
- ✅ Static export configuration
- ✅ Professional tone (no fantasy)

## Future Enhancements

Potential features to add:
- [ ] Contact form backend integration
- [ ] Blog/writeups section
- [ ] TryHackMe stats API integration
- [ ] GitHub activity feed
- [ ] Project filtering by tech stack
- [ ] Dark/light mode toggle (if requested)

## Homelab Context

**Primary Services:**
- Synology NAS: File storage, web hosting, Emby
- Raspberry Pi 3B+: Security testing, Pwnagotchi
- Docker containers for various services
- Proxmox virtualization

**Self-Hosted Sites:**
- circuitsorcerer.us.kg (this portfolio)
- familyandfriendoutreach.com (advocacy site)

## Last Updated

**Date:** December 25, 2025
**Last Deploy:** Navbar overlap fix + tag cloud skills
**Version:** v2.0 (Complete redesign)
**GitHub Commit:** f5bb08a
