# Circuit Sorcerer Backend

This directory contains the backend automation workflows for the Circuit Sorcerer portfolio website.

## Overview

The backend system handles:
- **Contact form submissions** → PostgreSQL → Discord notifications
- **Media requests** → PostgreSQL → Discord notifications
- **Emby user registration** → PostgreSQL → Telegram approval → Auto-account creation

## Architecture

```
Frontend (Next.js)
    ↓ (webhooks)
n8n Workflows
    ↓
PostgreSQL Database
    ↓
Notifications (Discord/Telegram)
```

## Prerequisites

### Required Services

1. **n8n Instance** - Workflow automation platform
2. **PostgreSQL Database** - Data storage
3. **Discord Server** - For notifications (2 channels: messages & requests)
4. **Telegram Bot** - For admin approvals
5. **Emby Media Server** - For auto-account creation

### Environment Setup

Before importing the workflow, you'll need:

- **PostgreSQL Database:**
  - Host, port, database name
  - Username and password
  - Tables created (see Database Schema below)

- **Discord Webhooks:**
  - Messages channel webhook URL
  - Requests channel webhook URL

- **Telegram Bot:**
  - Bot token (from @BotFather)
  - Your Chat ID (get from @userinfobot)

- **Emby Server:**
  - Server URL (internal IP recommended for n8n)
  - Admin API key

## Quick Start

### 1. Import Workflow Template

1. Open your n8n instance
2. Create new workflow
3. Import `n8n-workflows/circuit-sorcerer-backend-template.json`

### 2. Configure Credentials

**PostgreSQL (6 nodes):**
- Save Contact
- Save Media
- Save Registration
- Get User Details
- Update Status Approved
- Update Status Denied

**Telegram Bot (4 nodes):**
- Format Telegram
- Telegram Notify
- Send Approval Confirmation
- Send Denial Confirmation

### 3. Update Placeholders

Replace these placeholders with your actual values:

**Discord Webhooks:**
- `YOUR_WEBHOOK_ID` → Your Discord webhook ID
- `YOUR_WEBHOOK_TOKEN` → Your Discord webhook token

**Telegram:**
- `YOUR_TELEGRAM_BOT_TOKEN` → Bot token from @BotFather
- `YOUR_TELEGRAM_CHAT_ID` → Your Telegram user ID

**Emby:**
- `YOUR_EMBY_API_KEY` → Emby admin API key
- `YOUR_EMBY_IP` → Emby server local IP address
- `your-emby-server.example.com` → Your Emby domain (if using external)

### 4. Activate Workflow

- Click "Active" toggle
- Click "Save"

## Database Schema

### contacts
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### media_requests
```sql
CREATE TABLE media_requests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### emby_registrations
```sql
CREATE TABLE emby_registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Status values:** `pending`, `approved`, `denied`

## Webhook Endpoints

After deployment, your webhooks will be available at:

```
https://your-n8n-instance.com/webhook/contact
https://your-n8n-instance.com/webhook/media-request
https://your-n8n-instance.com/webhook/emby-registration
```

Update these URLs in your frontend:
- `src/app/contact/page.tsx` - All three forms

## Workflow Features

### Contact Form Flow
1. User submits contact form
2. Data sanitized and saved to PostgreSQL
3. Discord notification sent to Messages channel
4. Success response returned

### Media Request Flow
1. User submits media request
2. Data sanitized and saved to PostgreSQL
3. Discord notification sent to Requests channel
4. Success response returned

### Emby Registration Flow
1. User submits registration form
2. Password hashed and saved to PostgreSQL
3. Telegram notification sent to admin
4. Admin replies "approve X" or "deny X"
5. If approved:
   - Emby account created via API
   - Database status updated to "approved"
   - Confirmation sent via Telegram
6. If denied:
   - Database status updated to "denied"
   - Denial message sent via Telegram

## Telegram Commands

Admin can respond to registration notifications with:

- `approve [ID]` - Create Emby account and approve registration
- `deny [ID]` - Reject registration

Commands are case-insensitive (`Approve`, `approve`, `APPROVE` all work).

## Testing

### Test Contact Form
```bash
curl -X POST https://your-n8n.com/webhook/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Test Media Request
```bash
curl -X POST https://your-n8n.com/webhook/media-request \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "type": "movie",
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Test Emby Registration
```bash
curl -X POST https://your-n8n.com/webhook/emby-registration \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "TestPass123"
  }'
```

## Security Considerations

- **Never commit actual credentials** to version control
- Store API keys and tokens in n8n credential store
- Use environment variables for sensitive configuration
- Enable rate limiting on webhook endpoints
- Validate all user input before database insertion
- Use HTTPS for all external communications
- Restrict Telegram bot to authorized Chat IDs only

## Troubleshooting

### Common Issues

**1. Type validation errors in IF nodes**
- Ensure `typeValidation: "loose"` in workflow JSON
- Use `type: "string"` for comparisons

**2. Emby API connection failures**
- Use internal IP address instead of external domain
- Verify Authentication is set to "None"
- Check headers include `X-Emby-Token` and `Content-Type`

**3. No Telegram responses**
- Verify bot token is correct
- Check Chat ID matches authorized user
- Ensure workflow is Active

**4. Discord notifications not appearing**
- Verify webhook URLs are correct
- Test webhooks manually with curl
- Check channel permissions

## Development

### Making Changes

1. **Export current workflow** from n8n (backup)
2. **Make changes** in n8n UI
3. **Test thoroughly** with all endpoints
4. **Export updated workflow**
5. **Sanitize** (remove credentials/personal info)
6. **Commit** to git with changelog

### Sanitization Script

Before committing any workflow file:

```bash
# Replace Discord webhooks
sed -i 's|https://discord.com/api/webhooks/[0-9]*/[A-Za-z0-9_-]*|https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN|g' workflow.json

# Replace Telegram token
sed -i 's|[0-9]*:AA[A-Za-z0-9_-]*|YOUR_TELEGRAM_BOT_TOKEN|g' workflow.json

# Replace Chat ID
sed -i 's|"[0-9]{10,}"|"YOUR_TELEGRAM_CHAT_ID"|g' workflow.json

# Replace Emby API key
sed -i 's|[a-f0-9]{32}|YOUR_EMBY_API_KEY|g' workflow.json

# Replace Emby URL
sed -i 's|https://[a-z0-9.-]*\.us\.kg|https://your-emby-server.example.com|g' workflow.json
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Next.js @ circuitsorcerer.us.kg)            │
│                                                         │
│  - /contact page with 3 forms                          │
│  - Submits to n8n webhooks                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  n8n Workflows                                          │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Contact   │  │ Media Request│  │ Emby Reg     │  │
│  │   Webhook   │  │   Webhook    │  │   Webhook    │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                │                  │          │
│         ▼                ▼                  ▼          │
│  ┌─────────────────────────────────────────────────┐  │
│  │         PostgreSQL Database                     │  │
│  │  - contacts                                     │  │
│  │  - media_requests                               │  │
│  │  - emby_registrations                           │  │
│  └─────────────────────────────────────────────────┘  │
│         │                │                  │          │
│         ▼                ▼                  ▼          │
│  ┌───────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │  Discord  │  │  Discord   │  │   Telegram      │  │
│  │ (Messages)│  │ (Requests) │  │  Notification   │  │
│  └───────────┘  └────────────┘  └────────┬────────┘  │
│                                           │           │
│                                           ▼           │
│                                  ┌─────────────────┐  │
│                                  │  Admin Approval │  │
│                                  │  (approve/deny) │  │
│                                  └────────┬────────┘  │
│                                           │           │
│                                           ▼           │
│                                  ┌─────────────────┐  │
│                                  │  Emby Server    │  │
│                                  │  Auto-create    │  │
│                                  │  Account        │  │
│                                  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Support

For issues or questions:
- Check workflow execution logs in n8n
- Review database logs for connection issues
- Test webhooks individually with curl
- Verify all credentials are configured correctly

## License

This workflow template is part of the Circuit Sorcerer project.
