export const embyData = {
  serverUrl: process.env.EMBY_SERVER_URL || 'sal9000.circuitsorcerer.us.kg',
  apiKey: process.env.EMBY_API_KEY || '',
  adminMessage: 'Server is currently running normally. No maintenance scheduled.',
  registrationFields: ['name', 'username', 'password'],
  connectionInstructions: {
    phone: '1. Download Emby app from App Store (iOS) or Google Play (Android)\n2. Open the app and tap "Add Server"\n3. Enter server address: https://sal9000.circuitsorcerer.us.kg\n4. Enter your username and password\n5. If connection fails, ensure you have internet and try again',
    tablet: '1. Download Emby app from your tablet\'s app store (App Store or Google Play)\n2. Open the app and select "Connect to Server"\n3. Enter server URL: https://sal9000.circuitsorcerer.us.kg\n4. Sign in with your provided credentials\n5. Update the app if issues persist',
    smartTV: '1. Open your Smart TV\'s app store (Samsung, LG, etc.)\n2. Search for "Emby" and install the app\n3. Launch the app and select "Add Server"\n4. Enter: https://sal9000.circuitsorcerer.us.kg\n5. Log in with your username and password\n6. If unsupported, your TV may need a firmware update or Emby Premiere subscription',
    streamingDevice: '1. On Roku: Go to Channel Store > Search "Emby" > Add Channel\n   On Firestick: Amazon Appstore > Search "Emby" > Download\n2. Launch Emby app\n3. Select "Connect to Server"\n4. Enter: https://sal9000.circuitsorcerer.us.kg\n5. Sign in with credentials\n6. For 4K playback, ensure Premiere subscription and compatible device',
    computer: '1. Open web browser and go to: https://sal9000.circuitsorcerer.us.kg\n2. Or download Emby Theater desktop app from emby.media/download\n3. Enter server address if prompted: https://sal9000.circuitsorcerer.us.kg\n4. Log in with your account credentials\n5. Clear browser cache if login issues occur'
  },
  troubleshooting: {
    commonIssues: [
      'HTTPS Certificate Warning: Accept the warning if it appears (self-signed certificate)',
      'Connection Refused: Check your internet connection and try again',
      'Login Failed: Ensure username/password are correct (case-sensitive)',
      'App Not Found: Update your device or check app store compatibility',
      'Buffering/Stuttering: Lower quality in app settings or check bandwidth',
      'Port Issues: Server uses port 443 (HTTPS); ensure no firewall blocks it',
      'VPN Problems: Disable VPN if it interferes with connection'
    ],
    advancedTips: [
      'Test server reachability: Visit https://sal9000.circuitsorcerer.us.kg in browser',
      'App Updates: Ensure latest Emby app version',
      'Device Compatibility: Some older devices may not support all features',
      'Premiere Benefits: Subscription unlocks mobile sync, offline downloads, 4K'
    ],
    contactHelp: 'If you\'re still stuck after trying these steps, please contact the admin by filling out the account request form above or sending a direct message with details of your device, app version, and error message.'
  }
}