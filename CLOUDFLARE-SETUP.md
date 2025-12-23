# Cloudflare Setup Guide for circuitsorcerer.us.kg

This guide will help you set up your Circuit Sorcerer site with Cloudflare Tunnel on the domain **circuitsorcerer.us.kg**.

## Prerequisites

- Domain: circuitsorcerer.us.kg (should be registered and added to Cloudflare)
- NAS: 192.168.1.104 (SSH port 6969)
- Site path: http://192.168.1.104/CS/

## Option 1: Cloudflare Tunnel (Recommended - No Port Forwarding)

### Step 1: Install cloudflared on Synology NAS

```bash
# SSH into your NAS
ssh -p 6969 dad@192.168.1.104

# Download cloudflared for x86-64 Synology
cd /tmp
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64

# Make it executable and move to system path
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Verify installation
cloudflared --version
```

### Step 2: Authenticate with Cloudflare

```bash
# This will open a browser window to authenticate
cloudflared tunnel login
```

**Note:** If you're SSH'd into the NAS, you may need to:
1. Run this command on your local machine first
2. Or copy the cert file manually to the NAS

### Step 3: Create a New Tunnel

```bash
# Create tunnel named "circuit-sorcerer"
cloudflared tunnel create circuit-sorcerer

# List tunnels to get the UUID
cloudflared tunnel list
```

**Save the tunnel UUID** - you'll need it for the config file.

### Step 4: Create Tunnel Configuration

Create the config file at `~/.cloudflared/config.yml`:

```bash
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

Add this configuration (replace `YOUR_TUNNEL_UUID` with the actual UUID from Step 3):

```yaml
tunnel: YOUR_TUNNEL_UUID
credentials-file: /home/dad/.cloudflared/YOUR_TUNNEL_UUID.json

ingress:
  # Route circuitsorcerer.us.kg to your site
  - hostname: circuitsorcerer.us.kg
    service: http://192.168.1.104/CS/
    originRequest:
      noTLSVerify: true

  # Route www subdomain (optional)
  - hostname: www.circuitsorcerer.us.kg
    service: http://192.168.1.104/CS/
    originRequest:
      noTLSVerify: true

  # Catch-all rule (required)
  - service: http_status:404
```

**Alternative if you want to route to port instead:**

```yaml
tunnel: YOUR_TUNNEL_UUID
credentials-file: /home/dad/.cloudflared/YOUR_TUNNEL_UUID.json

ingress:
  - hostname: circuitsorcerer.us.kg
    service: http://localhost:3535
    originRequest:
      httpHostHeader: 192.168.1.104
  - hostname: www.circuitsorcerer.us.kg
    service: http://localhost:3535
    originRequest:
      httpHostHeader: 192.168.1.104
  - service: http_status:404
```

### Step 5: Create DNS Records in Cloudflare

1. Go to **Cloudflare Dashboard** → Select your domain `circuitsorcerer.us.kg`
2. Go to **DNS** → **Records**
3. Add CNAME record:
   - **Type:** CNAME
   - **Name:** `@` (for root domain)
   - **Target:** `YOUR_TUNNEL_UUID.cfargotunnel.com`
   - **Proxy status:** Proxied (orange cloud)
   - Click **Save**

4. (Optional) Add www subdomain:
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `YOUR_TUNNEL_UUID.cfargotunnel.com`
   - **Proxy status:** Proxied (orange cloud)
   - Click **Save**

### Step 6: Route the Tunnel

```bash
# This associates the tunnel with your domain in Cloudflare
cloudflared tunnel route dns circuit-sorcerer circuitsorcerer.us.kg
```

### Step 7: Start the Tunnel

```bash
# Test the tunnel (runs in foreground)
cloudflared tunnel run circuit-sorcerer
```

If everything works, you should see logs indicating the tunnel is connected.

**Test your site:** Open https://circuitsorcerer.us.kg in your browser

### Step 8: Set Up Auto-Start on Boot

Once the tunnel is working, set it to start automatically:

**Option A: Using systemd (Recommended)**

Create systemd service file:

```bash
sudo nano /etc/systemd/system/cloudflared-circuit-sorcerer.service
```

Add this content:

```ini
[Unit]
Description=Cloudflare Tunnel - Circuit Sorcerer
After=network.target

[Service]
Type=simple
User=dad
ExecStart=/usr/local/bin/cloudflared tunnel run circuit-sorcerer
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable cloudflared-circuit-sorcerer
sudo systemctl start cloudflared-circuit-sorcerer

# Check status
sudo systemctl status cloudflared-circuit-sorcerer

# View logs
sudo journalctl -u cloudflared-circuit-sorcerer -f
```

**Option B: Using Synology Task Scheduler**

1. Open **Control Panel** → **Task Scheduler**
2. Create → **Triggered Task** → **User-defined script**
3. **General:**
   - Task: `Cloudflare Tunnel - Circuit Sorcerer`
   - User: `root`
   - Enabled: ✓
4. **Schedule:**
   - Run on: Boot-up
5. **Task Settings:**
   - Run command:
     ```bash
     /usr/local/bin/cloudflared tunnel run circuit-sorcerer
     ```
6. Click **OK**

---

## Option 2: Direct Cloudflare DNS (Requires Port Forwarding)

If you prefer not to use Cloudflare Tunnel, you can use traditional DNS:

### Requirements:
- Port 80 and 443 forwarded from your router to 192.168.1.104:3535
- Reverse proxy configured on NAS to serve HTTPS

### DNS Setup:

1. Go to **Cloudflare Dashboard** → `circuitsorcerer.us.kg` → **DNS**
2. Add A record:
   - **Type:** A
   - **Name:** `@`
   - **IPv4 address:** Your public IP address
   - **Proxy status:** Proxied (orange cloud)
   - **TTL:** Auto
3. Save

---

## Troubleshooting

### Tunnel not connecting
```bash
# Check cloudflared logs
cloudflared tunnel info circuit-sorcerer

# Test configuration
cloudflared tunnel --config ~/.cloudflared/config.yml run circuit-sorcerer
```

### DNS not resolving
- Wait 5-10 minutes for DNS propagation
- Clear browser cache (Ctrl+Shift+R)
- Check DNS: `nslookup circuitsorcerer.us.kg`
- Verify Cloudflare proxy is enabled (orange cloud)

### Site shows 502 error
- Verify NAS is accessible: `curl http://192.168.1.104/CS/`
- Check Synology Web Station is running
- Verify tunnel config points to correct internal URL

### Images/CSS not loading
- Check browser console for errors
- Verify all asset paths use `/CS/` prefix
- Clear Cloudflare cache:
  - Cloudflare Dashboard → Caching → Configuration → Purge Everything

---

## Security Headers (Optional)

Once your domain is working, add security headers in Cloudflare:

1. Go to **Rules** → **Transform Rules** → **Modify Response Header**
2. Create rule:
   - **Name:** Security Headers - Circuit Sorcerer
   - **When incoming requests match:** `circuitsorcerer.us.kg`
   - **Then:**
     - Add `X-Frame-Options: DENY`
     - Add `X-Content-Type-Options: nosniff`
     - Add `Referrer-Policy: strict-origin-when-cross-origin`
     - Add `Permissions-Policy: geolocation=(), microphone=(), camera=()`

---

## Verification Checklist

- [ ] Domain circuitsorcerer.us.kg is added to Cloudflare
- [ ] cloudflared installed on NAS
- [ ] Tunnel created and configured
- [ ] DNS CNAME record created pointing to tunnel
- [ ] Tunnel is running (test mode)
- [ ] Site accessible at https://circuitsorcerer.us.kg
- [ ] All images and CSS loading correctly
- [ ] Tunnel set to auto-start on boot
- [ ] (Optional) Security headers configured

---

## Quick Reference

**Tunnel Management Commands:**
```bash
# List tunnels
cloudflared tunnel list

# Start tunnel (foreground)
cloudflared tunnel run circuit-sorcerer

# Stop tunnel (if running as service)
sudo systemctl stop cloudflared-circuit-sorcerer

# View tunnel info
cloudflared tunnel info circuit-sorcerer

# Delete tunnel (if needed)
cloudflared tunnel delete circuit-sorcerer
```

**Local Testing:**
```bash
# Test NAS site is accessible
curl http://192.168.1.104/CS/

# Test with full headers
curl -I https://circuitsorcerer.us.kg
```

---

## Next Steps After Setup

1. Update `src/config/site.ts` with correct domain URL
2. Test all pages load correctly
3. Verify SSL certificate (Cloudflare provides automatic HTTPS)
4. Monitor tunnel uptime
5. Set up Cloudflare Analytics (optional)

---

**Created:** December 23, 2024
**For:** Circuit Sorcerer Portfolio (https://circuitsorcerer.us.kg)
**NAS:** 192.168.1.104 (Synology)
**Site Path:** /CS/
