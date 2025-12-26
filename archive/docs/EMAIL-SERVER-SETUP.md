# Email Server Setup - Circuit Sorcerer

**Status:** 🟡 In Progress - Paused at DNS Configuration
**Date:** 2025-12-25

## ✅ Completed Steps

1. **MailPlus Server Installed & Running**
   - Version: 3.4.1-21569
   - Location: Synology NAS at 192.168.1.104:6969
   - Status: Active and running

2. **Domain Added**
   - Domain: `circuitsorcerer.us.kg`
   - Added to MailPlus Server

3. **Email Accounts Created**
   - ✅ contact@circuitsorcerer.us.kg (activated)
   - ✅ noreply@circuitsorcerer.us.kg (activated)
   - Total active accounts: 3/5

4. **SMTP Server Configuration**
   - Server: 192.168.1.104
   - Ports listening:
     - Port 25 (SMTP)
     - Port 587 (SMTP with STARTTLS) ← Recommended
     - Port 465 (SMTP with SSL/TLS)

## 🔧 SMTP Settings for Website Integration

```
SMTP Host: 192.168.1.104
SMTP Port: 587 (or 465)
SMTP Security: STARTTLS (port 587) or SSL/TLS (port 465)
Username: contact@circuitsorcerer.us.kg
Password: [password you set in MailPlus]
From Email: noreply@circuitsorcerer.us.kg
```

## ⚠️ What Still Needs to Be Done

### 1. Configure DNS Records in Cloudflare

**IMPORTANT:** Emails won't work to external addresses (like Gmail) until DNS is configured!

Add these records in Cloudflare for `circuitsorcerer.us.kg`:

#### MX Record
```
Type: MX
Name: @
Priority: 10
Content: mail.circuitsorcerer.us.kg
```

#### A Record (for mail subdomain)
```
Type: A
Name: mail
Content: [Your NAS public IP or use Cloudflare Tunnel]
Proxy: Off (orange cloud disabled)
```

#### SPF Record
```
Type: TXT
Name: @
Content: v=spf1 mx ~all
```

#### DKIM Record
- Get from MailPlus Server → Security → DKIM
- Copy the public key
- Add as TXT record

#### DMARC Record
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=quarantine; rua=mailto:postmaster@circuitsorcerer.us.kg
```

### 2. Test Email Sending
- After DNS is configured, send test email to Gmail
- Verify emails arrive in inbox (not spam)

### 3. Integrate with Circuit Sorcerer Website
- Update contact form to use SMTP settings above
- Update Emby registration form
- Update media request form
- Use nodemailer or similar library in Node.js

## 📝 Notes

- **Why emails don't work yet:** Gmail and other providers reject emails from servers without proper DNS configuration (anti-spam measure)
- **Access MailPlus Server:** http://192.168.1.104:5000 → Open MailPlus Server app
- **SSH Access:** ssh -p 6969 dad@192.168.1.104

## 🎯 When You're Ready to Resume

1. Log into Cloudflare dashboard for circuitsorcerer.us.kg
2. Add the DNS records listed above
3. Wait 5-10 minutes for DNS propagation
4. Test sending email to Gmail: `echo "test" | /var/packages/MailPlus-Server/target/sbin/sendmail -f noreply@circuitsorcerer.us.kg mjmitguy@gmail.com`
5. If successful, integrate SMTP into website contact forms

## 🔐 Passwords to Remember

- **contact@circuitsorcerer.us.kg:** [password you set]
- **noreply@circuitsorcerer.us.kg:** [password you set]

Store these securely - you'll need them for SMTP authentication!
