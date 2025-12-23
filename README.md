# ⚡ Circuit Sorcerer Portfolio

A futuristic, neon-themed portfolio website showcasing self-hosted infrastructure, security projects, and technical expertise. Built with Next.js 15, TypeScript, and the Circuit Sorcerer theme (tech-magic fusion aesthetic).

## 🎨 Features

- **Circuit Sorcerer Theme**: Unique neon aesthetic blending cyberpunk technology (cyan/green) with mystical elements (purple/gold)
- **Fully Responsive**: Mobile-first design with smooth animations
- **Dark/Light Mode**: Theme toggle with "Daylight Sorcery" light variant
- **Self-Hosted**: Optimized for deployment on Synology NAS, Proxmox, or any Docker host
- **Performance Optimized**: Built for Lighthouse 100 scores
- **Accessibility**: WCAG AA compliant with reduced motion support

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (body), Orbitron (display)
- **Deployment**: Docker + Docker Compose

## 📋 Prerequisites

### For Local Development
- Node.js 20+ and npm
- Git

### For Synology NAS Deployment
- Synology NAS with DSM 7.0+
- Docker package installed on NAS
- Web Station installed (optional, for advanced routing)
- Basic terminal/SSH access knowledge

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/circuit-sorcerer-portfolio.git
cd circuit-sorcerer-portfolio
npm install
```

### 2. Configure Your Content

Update the following files with your information:

#### `src/config/site.ts`
```typescript
export const siteConfig = {
  name: 'Your Name',
  url: 'https://yourdomain.com',
  author: {
    name: 'Your Name',
    email: 'your@email.com',
    discord: 'yourhandle#0000',
    // ... update all social links
  },
}
```

#### `src/config/projects.ts`
- Update project descriptions
- Replace placeholder images in `/public/projects/`
- Update GitHub links and demo URLs

#### `src/config/skills.ts`
- Adjust skill proficiency levels
- Update certifications status

### 3. Add Your Images

Replace these placeholder files:
- `/public/avatar.png` - Your profile photo (400x400px recommended)
- `/public/og-image.png` - Open Graph image for social sharing (1200x630px)
- `/public/projects/*.png` - Your project screenshots and network diagrams

### 4. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🏠 Synology NAS Deployment Guide

### Method 1: Docker Compose (Recommended)

This is the easiest method for deploying on your Synology NAS.

#### Step 1: Prepare Your NAS

1. **Install Docker Package**:
   - Open Package Center on DSM
   - Search for "Docker"
   - Click Install

2. **Enable SSH** (if not already):
   - Control Panel → Terminal & SNMP
   - Enable SSH service
   - Default port: 22

3. **Connect via SSH**:
   ```bash
   ssh your-nas-username@your-nas-ip
   ```

#### Step 2: Upload Your Project

**Option A: Using Git** (if Git Server package installed):
```bash
cd /volume1/docker
git clone https://github.com/YOUR_USERNAME/circuit-sorcerer-portfolio.git
cd circuit-sorcerer-portfolio
```

**Option B: Using File Station**:
1. Build locally: `npm run build`
2. Upload entire project folder to `/volume1/docker/circuit-sorcerer-portfolio`
3. SSH into NAS and navigate to folder

#### Step 3: Build Docker Image

```bash
# Navigate to project directory
cd /volume1/docker/circuit-sorcerer-portfolio

# Build the image
sudo docker build -t circuit-sorcerer:latest .
```

#### Step 4: Create docker-compose.yml

The project includes a `docker-compose.yml`. Review and adjust if needed:

```yaml
version: '3.8'

services:
  portfolio:
    build: .
    container_name: circuit-sorcerer
    ports:
      - "3000:3000"  # Change if port 3000 is in use
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://circuitsorcerer.us.kg
    restart: unless-stopped
```

#### Step 5: Launch with Docker Compose

```bash
sudo docker-compose up -d
```

Check if running:
```bash
sudo docker ps
```

View logs:
```bash
sudo docker logs circuit-sorcerer
```

Your site should now be accessible at: `http://YOUR_NAS_IP:3000`

---

### Method 2: Using Synology Container Manager (GUI)

If you prefer the Docker GUI in DSM:

1. **Open Container Manager** (formerly Docker) in DSM
2. **Build Image**:
   - Project → Create
   - Select your project folder
   - Build will start automatically
3. **Create Container**:
   - Container Name: `circuit-sorcerer`
   - Enable auto-restart
   - Port Settings: Local `3000` → Container `3000`
4. **Apply** and **Start**

---

### Setting Up Reverse Proxy (Cloudflare + NAS)

To serve your site on `circuitsorcerer.us.kg` with HTTPS:

#### Option 1: Cloudflare Tunnel (Recommended - No Port Forwarding)

1. **Install Cloudflared on NAS**:
   ```bash
   # For x86-64 Synology
   wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
   chmod +x cloudflared-linux-amd64
   sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
   ```

2. **Authenticate**:
   ```bash
   cloudflared tunnel login
   ```

3. **Create Tunnel**:
   ```bash
   cloudflared tunnel create circuit-sorcerer
   ```

4. **Configure Tunnel** (`~/.cloudflared/config.yml`):
   ```yaml
   tunnel: YOUR_TUNNEL_ID
   credentials-file: /home/YOUR_USER/.cloudflared/YOUR_TUNNEL_ID.json

   ingress:
     - hostname: circuitsorcerer.us.kg
       service: http://localhost:3000
     - service: http_status:404
   ```

5. **Create DNS Record** in Cloudflare Dashboard:
   - Type: CNAME
   - Name: `@` (or subdomain)
   - Target: `YOUR_TUNNEL_ID.cfargotunnel.com`
   - Proxy: Enabled (orange cloud)

6. **Run Tunnel**:
   ```bash
   cloudflared tunnel run circuit-sorcerer
   ```

7. **Auto-start on Boot** (Task Scheduler):
   - Control Panel → Task Scheduler
   - Create → Triggered Task → User-defined script
   - Boot-up trigger
   - Script: `/usr/local/bin/cloudflared tunnel run circuit-sorcerer`

#### Option 2: Traditional Reverse Proxy (Synology Web Station)

1. **Install Web Station** (Package Center)
2. **Control Panel** → Login Portal → Advanced → Reverse Proxy
3. **Create** new rule:
   - Source:
     - Protocol: HTTPS
     - Hostname: circuitsorcerer.us.kg
     - Port: 443
   - Destination:
     - Protocol: HTTP
     - Hostname: localhost
     - Port: 3000
4. **Add Let's Encrypt certificate**:
   - Control Panel → Security → Certificate
   - Add → Let's Encrypt
   - Domain: circuitsorcerer.us.kg

---

## 🛠️ What You Need to Install on Synology NAS

### Required Packages (from Package Center):
1. **Container Manager** (formerly Docker) - For running your site
2. **Git Server** (optional) - For pulling updates from GitHub

### Optional Packages:
3. **Web Station** - For reverse proxy configuration
4. **Cloudflared** (manual install) - For secure Cloudflare tunnels

### System Requirements:
- **RAM**: Minimum 2GB, Recommended 4GB+
- **Storage**: ~500MB for Docker image + your project files
- **DSM Version**: 7.0 or newer

---

## 🔧 Customization Guide

### Changing Colors

Edit `src/app/globals.css` CSS variables:

```css
:root {
  --electric-cyan: #00ffff;  /* Change primary color */
  --arcane-gold: #ffd700;    /* Change accent color */
  /* ... other colors */
}
```

### Adding New Pages

1. Create file in `src/app/YOUR_PAGE/page.tsx`
2. Add to navigation in `src/config/site.ts`:
   ```typescript
   nav: [
     // ... existing items
     { name: 'New Page', href: '/your-page' },
   ]
   ```

### Updating Projects

Edit `src/config/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Name',
    description: 'Short description',
    problem: 'Problem it solves',
    image: '/projects/your-image.png',
    category: 'infrastructure', // or 'services', 'security', 'automation'
    tags: ['Docker', 'Python', 'etc'],
    links: {
      github: 'https://github.com/...',
      docs: 'https://...',
      demo: 'https://...',
    },
    featured: true,
  },
]
```

---

## 📦 Project Structure

```
circuit-sorcerer-portfolio/
├── public/                   # Static assets
│   ├── avatar.png           # Your profile photo
│   ├── projects/            # Project screenshots
│   └── resume/              # Downloadable resume PDF
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   ├── projects/        # Projects page
│   │   ├── resume/          # Resume page (Phase 2)
│   │   ├── roadmap/         # Future projects (Phase 2)
│   │   ├── blog/            # Blog (Phase 2)
│   │   ├── support/         # Donations page (Phase 2)
│   │   └── contact/         # Contact page (Phase 2)
│   ├── components/
│   │   ├── layout/          # Navigation, Footer
│   │   ├── sections/        # Hero, About sections
│   │   └── custom/          # Custom components
│   ├── config/              # Site configuration
│   │   ├── site.ts          # Site metadata
│   │   ├── projects.ts      # Project data
│   │   └── skills.ts        # Skills & certs
│   ├── lib/                 # Utilities
│   │   ├── utils.ts         # Helper functions
│   │   ├── animations.ts    # Framer Motion variants
│   │   └── constants.ts     # Constants
│   └── types/               # TypeScript types
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Docker Compose setup
└── package.json             # Dependencies
```

---

## 🐛 Troubleshooting

### Docker Container Won't Start

**Check logs**:
```bash
sudo docker logs circuit-sorcerer
```

**Common issues**:
- Port 3000 already in use → Change in `docker-compose.yml`
- Permissions error → Run `sudo chmod -R 755 /volume1/docker/circuit-sorcerer`
- Memory limit → Increase in Container Manager settings

### Site Loads Slowly on NAS

**On Synology**:
- Ensure NAS isn't under heavy load (check Resource Monitor)
- Disable thumbnail generation in File Station
- Consider upgrading RAM if < 4GB
- Use SSD cache if available

### Cloudflare Tunnel Issues

**Tunnel not connecting**:
```bash
cloudflared tunnel run --url http://localhost:3000
```

**DNS not resolving**:
- Wait 5-10 minutes for DNS propagation
- Clear browser cache
- Check Cloudflare DNS settings (proxy must be ON)

### Images Not Loading

- Verify images exist in `/public/` directory
- Check file permissions: `sudo chmod 644 /public/avatar.png`
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

---

## 🚀 Performance Tips for Synology

1. **Use SSD Cache** (if available):
   - Storage Manager → SSD Cache → Create

2. **Limit Docker Memory**:
   - Container Manager → Container → Edit → Resource Limits → 512MB

3. **Enable Cloudflare Caching**:
   - Cloudflare Dashboard → Caching → Cache Rules
   - Browser Cache TTL: 4 hours

---

## 📝 Phase 2 Features (Coming Soon)

- ✅ **Blog** with MDX support
- ✅ **Contact Form** with n8n webhook integration
- ✅ **PostgreSQL** database for blog posts
- ✅ **Resume Downloads** and platform embeds (TryHackMe, HackTheBox)
- ✅ **Roadmap Timeline** with animated progress
- ✅ **Support/Donations** page with crypto QR codes

---

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

## 💬 Support

Need help deploying on your Synology NAS?

- 📧 Email: contact@circuitsorcerer.us.kg
- 💬 Discord: circuitsorcerer#0000

---

Built with ⚡ and magic by **Circuit Sorcerer**
