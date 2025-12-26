# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Backend Integration (n8n + PostgreSQL + Emby)

### Overview

The Circuit Sorcerer portfolio has a complete backend system for:
- **Contact form submissions** → Discord notifications
- **Media requests** → Discord notifications
- **Emby user registration** → Telegram approval → Auto-account creation

**Backend Stack:**
- **n8n:** Workflow automation (https://n8n.circuitsorcerer.us.kg)
- **PostgreSQL:** Database on Synology NAS (192.168.1.104:5432)
- **Emby Server:** Media server with API integration
- **Discord:** Notifications for contact/media requests
- **Telegram:** Admin approval system for Emby registrations

### Database Configuration

**Connection Details:**
- Host: 192.168.1.104
- Port: 5432
- Database: circuit_sorcerer_db
- User: circuit_sorcerer
- Password: (stored in n8n credentials)

**Tables:**

**contacts:**
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**media_requests:**
```sql
CREATE TABLE media_requests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  type VARCHAR(50),
  name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**emby_registrations:**
```sql
CREATE TABLE emby_registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  username VARCHAR(255),
  password_hash VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Status values:** `pending`, `approved`, `denied`
**Password format:** `salt:password` (salt-based hashing)

### n8n Workflow

**Workflow File:** `/home/hecker/Downloads/FIXED_WORKFLOW_IMPORT_THIS.json`

**Features:**
1. Contact form webhook → Save to DB → Discord notification
2. Media request webhook → Save to DB → Discord notification
3. Emby registration webhook → Save to DB → Telegram notification → Approval system

**Webhook Endpoints:**
- Contact: `https://n8n.circuitsorcerer.us.kg/webhook/contact`
- Media Request: `https://n8n.circuitsorcerer.us.kg/webhook/media-request`
- Emby Registration: `https://n8n.circuitsorcerer.us.kg/webhook/emby-registration`

**Telegram Approval Flow:**
1. User submits registration form
2. Admin receives Telegram notification
3. Admin replies: `approve X` or `deny X` (case-insensitive)
4. System creates Emby account via API (if approved)
5. Database status updated
6. Admin receives confirmation message

**Telegram Bot:**
- Token: `8305822584:AAGuw8SiEFXha52q787-ef5exM0ozMGFFmg`
- Authorized Chat ID: `8272278534`
- Commands: `approve [id]`, `deny [id]`

### Emby Server Integration

**Server Details:**
- External URL: https://sal9000.circuitsorcerer.us.kg (note the zero)
- Internal URL: http://[local-ip]:8096 (used by n8n for better performance)
- Server Name: SAL9000
- Version: 4.9.1.90

**API Configuration:**
- Endpoint: POST `/Users/New`
- Authentication: Header-based
- Header: `X-Emby-Token: 6be0eb3ca2024084b6b4593e1fec1ec0`

**API Request:**
```json
{
  "Name": "username",
  "Password": "plaintext_password"
}
```

**Important Notes:**
- Use **local IP address** in n8n (not external domain) for faster, more reliable connections
- Authentication in HTTP Request node must be set to **"None"**
- Headers must include both `X-Emby-Token` and `Content-Type: application/json`

### Frontend Forms

**Contact Page:** `/src/app/contact/page.tsx`

Three integrated forms:
1. **Contact Form** - General inquiries
2. **Media Request Form** - Request movies/TV shows
3. **Emby Registration Form** - Request account access

All forms submit to n8n webhooks and show success/error messages.

### Troubleshooting Backend Issues

**n8n Workflow Issues:**

1. **Type validation errors in IF nodes:**
   - Ensure `typeValidation: "loose"` in conditions
   - Use `type: "string"` for Chat ID comparison
   - Set `caseSensitive: false` to accept "Approve" or "approve"

2. **Emby API connection failures:**
   - Use **local IP address** instead of external domain
   - Set Authentication to **"None"** (not "Generic Credential Type")
   - Verify headers include both `X-Emby-Token` and `Content-Type`

3. **No Telegram response after approve/deny:**
   - Check Telegram bot credentials are configured
   - Verify Chat ID matches: `8272278534`
   - Ensure workflow is **Active**

4. **Database connection errors:**
   - Verify PostgreSQL credentials in ALL database nodes
   - Check network connectivity to NAS (192.168.1.104:5432)
   - Ensure database and tables exist

**Testing:**

Test script: `/home/hecker/Downloads/test-webhooks-unique.sh`

```bash
bash ~/Downloads/test-webhooks-unique.sh
```

Generates unique usernames and tests all three webhooks.

### Discord Integration

**Discord Channels:**
- **Messages channel:** Contact form submissions
- **Requests channel:** Media requests (movies/TV shows)

**Contact Form Webhook (→ Messages channel):**
`https://discordapp.com/api/webhooks/1454210344476999701/4p-58QrenVOLRsFjDlt3U33OtxOsLu4Rxj90RlaXfguzvR8sIdagq8z68ouuMPu51z58`

**Media Request Webhook (→ Requests channel):**
`https://discordapp.com/api/webhooks/1454210184606908496/0zXyAGrdIrE1OJ-7r7BWGsTK6KI15Tc_OGPtT05CCzVexHpBIamhST7s5dy5Yzx4K6-J`

Both use POST requests with JSON body: `{"content": "message"}`

### Security Notes

- API keys and tokens are stored in n8n credentials (not in code)
- Database credentials secured in n8n
- Webhook endpoints are public but rate-limited by n8n
- Emby admin API key has full permissions - protect carefully
- Telegram bot only responds to authorized Chat ID

### Future Enhancements

Potential improvements:
- [ ] Email notifications to users when registration approved
- [ ] Rate limiting on registration submissions
- [ ] Duplicate username checking before approval
- [ ] Emby user permissions customization
- [ ] Audit log for approvals/denials
- [ ] Automated cleanup of old pending registrations

## Last Updated

**Date:** December 26, 2025
**Last Deploy:** Backend integration complete (n8n + PostgreSQL + Emby)
**Version:** v2.1 (Backend automation added)
**GitHub Commit:** (pending)
**Backend Status:** ✅ Fully operational - Approval flow tested and working
