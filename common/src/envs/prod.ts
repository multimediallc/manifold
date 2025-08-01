export type EnvConfig = {
  domain: string
  firebaseConfig: FirebaseConfig
  amplitudeApiKey: string
  supabaseInstanceId: string
  supabaseAnonKey: string
  twitchBotEndpoint: string
  apiEndpoint: string
  googleAnalyticsId: string

  // IDs for v2 cloud functions -- find these by deploying a cloud function and
  // examining the URL, https://[name]-[cloudRunId]-[cloudRunRegion].a.run.app
  cloudRunId: string
  cloudRunRegion: string

  // Access controls
  adminIds: string[]
  visibility: 'PRIVATE' | 'PUBLIC'

  // Branding
  moneyMoniker: string // e.g. 'Ṁ'
  spiceMoniker: string // e.g. 'S'
  bettor: string // e.g. 'predictor'
  nounBet: string // e.g. 'prediction'
  verbPastBet: string // e.g. 'predicted'
  faviconPath: string // Should be a file in /public
  newQuestionPlaceholders: string[]
  expoConfig: {
    iosClientId?: string
    iosClientId2?: string
    expoClientId?: string
    androidClientId?: string
    androidClientId2?: string
  }
}

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  region?: string
  storageBucket: string
  privateBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export const PROD_CONFIG: EnvConfig = {
  domain: 'mmllc.markets',
  amplitudeApiKey: '2d6509fd4185ebb8be29709842752a15',
  supabaseInstanceId: 'aetjitrbyeoyqtvtmixv',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFldGppdHJieWVveXF0dnRtaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTMzNTIsImV4cCI6MjA2ODg4OTM1Mn0.iedt4ZaBvkgSyfLiWBnZkiFNUoTZGeHAV-SMZWI-vrs',
  googleAnalyticsId: 'G-P9C8XSYPEP',
  firebaseConfig: {
    apiKey: 'AIzaSyDqH0k9gejYiKm1Hz6BTzXNFyKbeg9Cdgk',
    authDomain: 'mm-manifold-dev.firebaseapp.com',
    projectId: 'mm-manifold-dev',
    region: 'us-central1',
    storageBucket: 'mm-manifold-dev.firebasestorage.app',
    privateBucket: 'mm-manifold-dev-private',
    messagingSenderId: '504093051915',
    appId: '1:504093051915:web:e82d906f8af5d6f5b44b0e',
    measurementId: 'G-P9C8XSYPEP',
  },
  twitchBotEndpoint: 'https://twitch-bot.manifold.markets',
  //apiEndpoint: 'api.manifold.markets',
  apiEndpoint: 'api.mmllc.markets',
  cloudRunId: 'nggbo3neva',
  cloudRunRegion: 'uc',

  adminIds: [
//    'igi2zGXsfxYPgB0DJTXVJVmwCOr2', // Austin
  ],
  visibility: 'PUBLIC',

  moneyMoniker: 'Ṁ',
  spiceMoniker: 'P',
  bettor: 'trader',
  verbPastBet: 'traded',
  nounBet: 'trade',
  faviconPath: '/favicon.ico',
  newQuestionPlaceholders: [
    'Will anyone I know get engaged this year?',
    'Will humans set foot on Mars by the end of 2030?',
    'Will any cryptocurrency eclipse Bitcoin by market cap this year?',
    'Will the Democrats win the 2024 presidential election?',
  ],
  expoConfig: {
    iosClientId:
      '128925704902-n0ic4j1s5tk51t2vu8anu8glh3t5jimo.apps.googleusercontent.com',
    iosClientId2:
      '128925704902-k6d8219pss8nubk1bb1n5kisn5l8fv1a.apps.googleusercontent.com',
    expoClientId:
      '128925704902-bpcbnlp2gt73au3rrjjtnup6cskr89p0.apps.googleusercontent.com',
    androidClientId:
      '128925704902-ur9hevfika2rs0sni6ju236u82hbct3i.apps.googleusercontent.com',
    androidClientId2:
      '128925704902-r23bsi4ca28sprdh49mprl1ov33pvvau.apps.googleusercontent.com',
  },
}
