# Circuit Sorcerer - Project History & Setup

## Project Overview

**Circuit Sorcerer Portfolio** - A futuristic, neon-themed portfolio website showcasing self-hosted infrastructure, security projects, and technical expertise.

- **Domain:** https://circuitsorcerer.us.kg
- **NAS Path:** 192.168.1.104:/volume1/web/CS/
- **GitHub:** https://github.com/DJ5al5a/circuit-sorcerer
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion

## Current Status (December 23, 2024)

✅ **Website fully functional and live at https://circuitsorcerer.us.kg**
✅ **All images, animations, and styles working correctly**
✅ **Deployed to Synology NAS via Cloudflare Tunnel**
✅ **Repository cleaned - contains only website files**

---

## Project Structure

```
/home/hecker/Projects/ME/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Homepage with Hero section
│   │   ├── about/                # About page (integrated into homepage)
│   │   ├── projects/             # Projects showcase page
│   │   ├── resume/               # Placeholder - Phase 2
│   │   ├── roadmap/              # Placeholder - Phase 2
│   │   ├── blog/                 # Placeholder - Phase 2
│   │   ├── contact/              # Contact page with social links
│   │   └── support/              # Placeholder - Phase 2
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx    # Main navigation
│   │   │   └── Footer.tsx        # Site footer
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx   # Homepage hero with avatar
│   │   │   └── AboutSection.tsx  # Skills, certs, stats
│   │   └── custom/
│   │       ├── ProjectCard.tsx   # Project display card
│   │       └── ThemeToggle.tsx   # Dark/light mode toggle
│   ├── config/
│   │   ├── site.ts               # Site metadata, author info
│   │   ├── projects.ts           # All project data
│   │   └── skills.ts             # Skills and certifications
│   └── lib/
│       ├── animations.ts         # Framer Motion variants
│       ├── utils.ts              # Helper functions
│       └── constants.ts          # App constants
├── public/
│   ├── background2.jpeg          # Hero section background
│   ├── background.jpeg           # About section background
│   ├── sorcerer.jpeg             # Projects page background
│   ├── silgouette.jpeg           # About section decorative
│   ├── laptop_logo.jpeg          # Circuit Sorcerer logo
│   ├── circuitsorcerer.png       # Video poster image
│   ├── og-image.jpg              # Social media preview
│   └── grok-video-*.mp4          # Demo video
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # Project documentation
```

---

## What We Built (Complete Session History)

### 1. Initial Setup & Missing Pages
**Problem:** Site had navigation links to pages that didn't exist
**Solution:** Created placeholder pages for:
- `/resume` - Future resume and certifications
- `/roadmap` - Learning journey timeline
- `/blog` - Technical write-ups
- `/contact` - Email and social links (functional)
- `/support` - Donations/support page

### 2. Image Integration
**Problem:** User had 8 images in ~/Projects/ME/ folder that weren't used
**Solution:** Integrated all images into the site:
- `background2.jpeg` → Hero section background
- `background.jpeg` → About section background
- `sorcerer.jpeg` → Projects page hero background
- `silgouette.jpeg` → About section decorative element
- `laptop_logo.jpeg` → Circuit Sorcerer logo in About section
- `circuitsorcerer.png` → Video poster image
- `grok-video-*.mp4` → Demo video in About section
- `og-image.jpg` → Social media preview image

### 3. Deployment to NAS
**Setup:**
- NAS: Synology at 192.168.1.104
- SSH: Port 6969, user `dad`
- Deployment path: `/volume1/web/CS/`

**Initial Issue:** rsync failed due to SSH subsystem restrictions

**Solution:** Created `deploy.sh` script using tar-over-SSH:
```bash
tar -czf - . | ssh -p 6969 dad@192.168.1.104 "cd /volume1/web/CS && tar -xzf -"
```

### 4. BasePath Configuration (Subdirectory Deployment)
**Problem:** Site deployed to /CS/ subdirectory, assets loading from wrong paths
**Solution:** Added `basePath: '/CS'` to `next.config.ts`
**Result:** Site worked at http://192.168.1.104/CS/

### 5. Image Path Issues
**Problem:** Images weren't loading - inline styles don't auto-apply basePath
**Solution:** Manually added `/CS` prefix to all image URLs:
- Updated all `backgroundImage: 'url(/CS/image.jpeg)'` paths
- Updated all `src="/CS/image.jpeg"` paths

### 6. Cloudflare Tunnel Setup
**Created:** Comprehensive CLOUDFLARE-SETUP.md guide
**Result:** User configured Cloudflare Tunnel for domain circuitsorcerer.us.kg

**Cloudflare Configuration:**
- Tunnel hostname: `circuitsorcerer.us.kg`
- Service URL: `http://192.168.1.104/CS/`
- DNS: CNAME record pointing to tunnel UUID

### 7. Domain Deployment Fix (CRITICAL)
**Problem:** Site loaded at domain but showed only text, no images/animations/styles
**Root Cause:** Site configured with `basePath: '/CS'` for subdirectory, but now has dedicated domain
**Solution:**
- Removed `basePath: '/CS'` from next.config.ts
- Removed `/CS` prefix from ALL image paths
- Rebuilt and redeployed

**Files Modified:**
- `next.config.ts` - Removed basePath
- `src/components/sections/HeroSection.tsx` - Fixed image paths
- `src/components/sections/AboutSection.tsx` - Fixed image paths
- `src/app/projects/page.tsx` - Fixed image paths

### 8. Repository Cleanup
**Removed from Git:**
- Entire `scripts/` folder (AI delegation system - 12 files)
- `CLOUDFLARE-SETUP.md` (deployment guide)
- `deploy.sh` (deployment script)
- Cleaned `package.json` - removed bin entry and delegate scripts

**Result:** Clean repository with only 40 website files

---

## Key Configuration Files

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

**Important:**
- NO basePath (domain deployment)
- Static export for NAS deployment
- Images unoptimized (required for static export)

### package.json - Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## Deployment Process

### Local Development
```bash
cd /home/hecker/Projects/ME
npm run dev
# Visit http://localhost:3000
```

### Build for Production
```bash
npm run build
# Output in /out/ directory
```

### Deploy to NAS (Manual)
Since we removed deploy.sh from repo, here's the process:

```bash
cd /home/hecker/Projects/ME
npm run build

# Deploy using tar-over-SSH
cd out
tar -czf - . | ssh -p 6969 dad@192.168.1.104 "cd /volume1/web/CS && tar -xzf -"
```

### Cloudflare Tunnel (Already Running)
The Cloudflare Tunnel is configured to:
- Route `circuitsorcerer.us.kg` → `http://192.168.1.104/CS/`
- Provide automatic HTTPS via Cloudflare proxy
- No port forwarding required

---

## Important Notes for Future Development

### Adding/Changing Images

**CRITICAL:** When adding or modifying images, use paths WITHOUT /CS prefix:

✅ **Correct:**
```typescript
backgroundImage: 'url(/background.jpeg)'
<Image src="/avatar.png" ... />
<video poster="/poster.png">
  <source src="/video.mp4" />
```

❌ **Wrong:**
```typescript
backgroundImage: 'url(/CS/background.jpeg)'  // NO!
<Image src="/CS/avatar.png" ... />           // NO!
```

### Next.js Image Component
The Next.js `<Image>` component automatically applies the basePath (which is now removed), so always use root paths.

### Inline Styles
Inline style image URLs (like `backgroundImage`) are NOT automatically prefixed, so they must use the same root paths.

### Testing Changes

1. **Local test first:**
   ```bash
   npm run dev
   # Check http://localhost:3000
   ```

2. **Build and verify:**
   ```bash
   npm run build
   npm start
   # Check http://localhost:3000
   ```

3. **Deploy to NAS:**
   ```bash
   cd out
   tar -czf - . | ssh -p 6969 dad@192.168.1.104 "cd /volume1/web/CS && tar -xzf -"
   ```

4. **Verify live:**
   - Visit https://circuitsorcerer.us.kg
   - Check all images load
   - Check all animations work
   - Test on mobile

---

## Git Workflow

### Committing Changes
```bash
git add .
git status  # Review changes

git commit -m "Description of changes

- Detail 1
- Detail 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push origin main
```

### Current Branch
- **Branch:** main
- **Remote:** https://github.com/DJ5al5a/circuit-sorcerer

---

## Files NOT in Repository (Kept Local)

These files exist locally but are NOT tracked in git:

- `deploy.sh` - NAS deployment script (removed from repo)
- `CLOUDFLARE-SETUP.md` - Cloudflare setup guide (removed from repo)
- `scripts/` - AI delegation system (removed from repo)
- `.next/` - Build cache (gitignored)
- `out/` - Build output (gitignored)
- `node_modules/` - Dependencies (gitignored)

**Reason:** Repository should only contain website source code, not deployment scripts or build artifacts.

---

## Theme System

### Circuit Sorcerer Color Palette

**Primary Colors:**
- Electric Cyan: `#00d9ff` - Technology/circuits
- Arcane Gold: `#ffd700` - Magic/mystical
- Mystic Purple: `#a855f7` - Sorcery elements
- Circuit Green: `#00ff87` - Success/network

**Background Colors:**
- Void: `#0a0a0f` - Main background
- Shadow: `#13131a` - Secondary background
- Abyss: `#1a1a24` - Card backgrounds

### Dark Mode
Site has theme toggle but defaults to dark theme (Circuit Sorcerer aesthetic).

---

## Common Issues & Solutions

### Issue: Images not loading after deploy
**Cause:** Image paths have `/CS` prefix or wrong path
**Solution:** Remove `/CS` prefix, use root paths like `/image.jpeg`

### Issue: Styles not applying
**Cause:** CSS might be cached by Cloudflare
**Solution:**
1. Clear Cloudflare cache (Dashboard → Caching → Purge Everything)
2. Hard refresh browser (Ctrl+Shift+R)

### Issue: Build fails
**Cause:** Usually TypeScript errors
**Solution:** Run `npm run lint` to see errors, fix and rebuild

### Issue: Site slow to load
**Cause:** Large video file (3.7MB)
**Solution:** Video is lazy-loaded, consider optimizing in future

---

## Phase 2 Features (Future Development)

Currently placeholder pages exist for:
- ✅ Resume page - Add downloadable resume, embed TryHackMe/HackTheBox badges
- ✅ Roadmap page - Timeline of learning journey and future projects
- ✅ Blog page - MDX blog posts with technical write-ups
- ✅ Support page - Crypto donation addresses, sponsor links

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Deploy to NAS
cd out && tar -czf - . | ssh -p 6969 dad@192.168.1.104 "cd /volume1/web/CS && tar -xzf -"

# Git workflow
git add .
git commit -m "Your message"
git push origin main

# Check site
curl -I https://circuitsorcerer.us.kg
```

---

## Project Statistics

- **Total Files in Repo:** 40
- **Lines of Code:** ~3,500+ (TypeScript/TSX)
- **Images:** 7 JPEGs + 1 PNG
- **Video:** 1 MP4 (3.7MB)
- **Build Size:** ~15MB (static export)
- **Pages:** 9 (5 placeholders, 4 complete)

---

## Contact & Links

- **Live Site:** https://circuitsorcerer.us.kg
- **GitHub:** https://github.com/DJ5al5a/circuit-sorcerer
- **Email:** Contact info in site config
- **Discord:** Contact info in site config

---

**Last Updated:** December 23, 2024
**Status:** ✅ Production-ready and live
**Next Steps:** Phase 2 features (resume, roadmap, blog)
