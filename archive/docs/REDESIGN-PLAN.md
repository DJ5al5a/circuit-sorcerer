# Circuit Sorcerer - Redesign Plan
**Based on:** Brittany Chiang's Portfolio Design
**Date:** 2025-12-25

## 🎯 Design Goals

1. **Clean, minimal, professional aesthetic**
2. **Accessibility-first approach**
3. **Single-page scroll for main content**
4. **Fast, responsive, modern**
5. **Keep existing Next.js 15 + Tailwind stack**

## 🎨 Design System

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Headings:** Bold, large, clear hierarchy
- **Body:** Regular weight, comfortable reading size
- **Code/Mono:** Fira Code or similar

### Color Scheme (Adapting Brittany's Clean Style)
**Light Mode (Primary):**
- Background: `#ffffff` or `#f8f9fa` (soft white)
- Text: `#1a1a1a` (near black)
- Primary Accent: `#0ea5e9` (sky blue) - professional, tech-focused
- Secondary: `#64748b` (slate gray)
- Borders: `#e2e8f0`

**Optional Dark Mode:**
- Background: `#0f172a` (dark navy)
- Text: `#e2e8f0` (light gray)
- Accent: `#38bdf8` (lighter blue)

### Layout
- **Max Width:** 1200px centered
- **Padding:** Generous whitespace
- **Single Column:** Vertical scroll
- **Sections:** Full-height or content-height

## 📐 Page Structure

### Homepage (Single Page Scroll)

**Sections (in order):**

1. **Hero Section**
   - Large name/title
   - Tagline: "3D Artist, Motion Designer, & Homelab Enthusiast"
   - Brief intro (2-3 sentences)
   - CTA buttons: "View Projects" | "Contact Me"

2. **About Section**
   - Photo (avatar)
   - Bio paragraph
   - Current focus/interests
   - Skills overview

3. **Experience Section** (from Resume config)
   - Timeline/list of work experience
   - Certifications
   - Training platforms (TryHackMe, etc.)

4. **Projects Section** (Featured Work)
   - Grid of project cards
   - Each card: image, title, description, tech stack, links
   - Include: FAFO website, Homelab, Emby server, etc.

5. **Contact Section**
   - Contact form (using your MailPlus SMTP when DNS is ready)
   - Social links (GitHub, Discord, etc.)
   - Email: mjmitguy@gmail.com or contact@circuitsorcerer.us.kg

### Separate Pages (in Nav)

- **/roadmap** - Future goals and learning path
- **/emby** - Emby server info and registration
- **/support** - Donations and support options
- **/admin** - Keep hidden, direct URL only

## 🧭 Navigation

**Fixed Top Header:**
- Logo/Name (left): "Circuit Sorcerer" or "CS"
- Nav Links (right):
  - About (anchor to #about)
  - Experience (anchor to #experience)
  - Projects (anchor to #projects)
  - Roadmap (link to /roadmap)
  - Emby (link to /emby)
  - Contact (anchor to #contact)
- Resume button (downloads PDF or links to /resume)

**Sticky/Fixed on Scroll:**
- Minimal, transparent background with blur
- Shows on scroll up, hides on scroll down (optional)

## 🎭 Interactive Elements

### Animations (Subtle, Professional)
- Fade-in on scroll (sections appear as you scroll down)
- Smooth scroll to anchors
- Hover effects on project cards
- Button hover states
- Link underline animations

### Accessibility
- Skip to content link
- ARIA labels
- Keyboard navigation
- High contrast
- Semantic HTML

## 📱 Responsive Design

**Breakpoints:**
- Mobile: < 640px (single column, stacked)
- Tablet: 640px - 1024px (adjusted spacing)
- Desktop: > 1024px (full layout)

**Mobile Adaptations:**
- Hamburger menu for nav
- Stacked project cards
- Adjusted typography sizes
- Touch-friendly buttons

## 🛠️ Tech Stack (Keeping Current)

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** next/font for Inter
- **Animations:** Framer Motion (already installed)
- **Icons:** Lucide React (already installed)
- **Deployment:** Static export + Cloudflare Tunnel

## 📦 Content Migration

### From Current Site → New Design

**Reuse:**
- All config files (site.ts, resume.ts, projects.ts, etc.)
- Existing components (adapt styling)
- Forms and API routes
- Email integration structure

**Redesign:**
- Homepage → Single-page scroll
- About page → About section
- Resume page → Experience section
- Projects page → Projects section
- Contact page → Contact section

**Keep Separate Pages:**
- Roadmap (unique feature)
- Emby (special project)
- Support (donations)
- Admin (hidden)

## 🎯 Implementation Order

1. ✅ Set up design system (colors, typography, globals.css)
2. ✅ Create new layout with navigation
3. ✅ Build homepage sections:
   - Hero
   - About
   - Experience
   - Projects
   - Contact
4. ✅ Add smooth scroll and animations
5. ✅ Adapt separate pages (Roadmap, Emby, Support)
6. ✅ Test responsive design
7. ✅ Add footer with credits
8. ✅ Deploy and test

## 📝 Credits

**Design Inspiration:**
"Design inspired by [Brittany Chiang](https://brittanychiang.com/)"

Add to footer with link to her site.

## 🚀 Next Steps

1. Update globals.css with new color scheme
2. Install Inter font
3. Create new homepage layout
4. Start building sections

---

**Ready to begin!** 🎨
