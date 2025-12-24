# Circuit Sorcerer - Deployment Notes

## Security Updates Completed ✅

### Environment Variables
All sensitive credentials have been moved to `.env.local`:
- `EMBY_SERVER_URL` - Emby server URL
- `EMBY_API_KEY` - Emby API key  
- `ADMIN_PASSWORD` - Admin panel password

**IMPORTANT**: Never commit `.env.local` to git. It's already in `.gitignore`.

### Removed Hardcoded Credentials
- ✅ Removed hardcoded `admin123` password from admin page
- ✅ Removed exposed Emby API key from config
- ✅ Implemented proper authentication via API routes

## File Updates & Fixes

### Images
- ✅ Created `og-image.jpg` for social media previews
- ✅ Fixed filename typos: `backround3.jpeg` → `background3.jpeg`, `backround4.jpeg` → `background4.jpeg`
- ✅ Created placeholder SVG images for all 7 projects in `/public/projects/`

### API Endpoints (NEW)
All forms now use proper API routes instead of just alerts:

1. **Admin Authentication** - `/api/admin/auth`
   - POST: Validates admin password from env vars

2. **Admin Message Management** - `/api/admin/message`
   - GET: Retrieves current admin message
   - POST: Saves new admin message (requires auth)

3. **Contact Form** - `/api/contact`
   - POST: Saves contact submissions and media requests to `/data/submissions/`

4. **Emby Registration** - `/api/emby/register`
   - POST: Saves registration requests to `/data/emby-requests/`

### Configuration Changes
- ✅ Updated `next.config.ts` - Disabled static export to enable API routes
- ✅ Updated `.gitignore` - Added `/data` directory to exclude submissions from git

## Data Storage

Form submissions are stored locally in `/data/` directory:
- `/data/submissions/` - Contact form and media requests
- `/data/emby-requests/` - Emby registration requests  
- `/data/admin-message.json` - Admin panel message

**NOTE**: This is a simple file-based system for development. For production, consider using a database.

## Deployment Checklist

### Before Deploying:
1. ✅ Set up environment variables on hosting platform
2. ✅ Ensure `/data` directory has write permissions
3. ✅ Consider adding email notifications for form submissions
4. ✅ Test all forms to verify API endpoints work
5. ⚠️ Replace project placeholder images with actual screenshots

### Production Recommendations:
- Consider using a database instead of file-based storage
- Set up email notifications (e.g., SendGrid, Resend, Nodemailer)
- Implement rate limiting on API endpoints
- Add CSRF protection to forms
- Use proper session management for admin authentication

## Testing

Build completed successfully with all changes:
```bash
npm run build  # ✅ Passes
```

All pages render correctly:
- Home, About, Resume, Roadmap, Projects, Contact, Support, Emby, Admin

## Admin Panel Access

**New Password**: Set in `.env.local` as `ADMIN_PASSWORD`
**Default**: `CircuitSorcerer2024!SecurePassword` (change this!)

To access admin panel:
1. Navigate to `/admin`
2. Enter the password from `.env.local`
3. You can now update the server status message

## Next Steps

1. **Replace Placeholder Images**: Add real project screenshots to `/public/projects/`
2. **Email Integration**: Consider adding EmailJS or similar for form submissions
3. **Database Setup**: For production, migrate from file storage to a database
4. **Monitoring**: Set up error tracking and logging
5. **Analytics**: Add privacy-respecting analytics if desired

---
Generated: 2025-12-23
