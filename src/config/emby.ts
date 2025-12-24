export const embyData = {
  serverUrl: process.env.EMBY_SERVER_URL || 'sal9000.circuitsorcerer.us.kg',
  apiKey: process.env.EMBY_API_KEY || '',
  adminMessage: 'Server is currently running normally. No maintenance scheduled.',
  registrationFields: ['name', 'username', 'password'],
  connectionInstructions: {
    smartTV: '1. Open the app store on your Smart TV\n2. Search for "Emby"\n3. Install the Emby app\n4. Open the app and enter server URL: sal9000.circuitsorcerer.us.kg\n5. Sign in with your credentials',
    streamingDevice: '1. Go to your device\'s app store\n2. Download Emby app\n3. Launch and connect to: sal9000.circuitsorcerer.us.kg\n4. Login with provided credentials',
    phone: '1. Download Emby app from App Store or Google Play\n2. Open app and add server: sal9000.circuitsorcerer.us.kg\n3. Enter your username and password',
    tablet: '1. Install Emby from app store\n2. Add server address: sal9000.circuitsorcerer.us.kg\n3. Sign in with credentials',
    computer: '1. Visit app.emby.media in browser\n2. Or download desktop app\n3. Connect to server: sal9000.circuitsorcerer.us.kg\n4. Login with your account'
  }
}