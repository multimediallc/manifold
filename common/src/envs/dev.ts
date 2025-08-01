import { EnvConfig, PROD_CONFIG } from './prod'

export const DEV_CONFIG: EnvConfig = {
  ...PROD_CONFIG,
  domain: 'dev.manifold.markets',
  googleAnalyticsId: '',
  firebaseConfig: {
    apiKey: 'AIzaSyBoq3rzUa8Ekyo3ZaTnlycQYPRCA26VpOw',
    authDomain: 'dev-mm-manifold-dev.firebaseapp.com',
    projectId: 'dev-mm-manifold-dev',
    region: 'us-central1',
    storageBucket: 'dev-mm-manifold-dev.appspot.com',
    privateBucket: 'dev-mm-manifold-dev-private',
    messagingSenderId: '134303100058',
    appId: '1:134303100058:web:27f9ea8b83347251f80323',
    measurementId: 'G-YJC9E37P37',
  },
  cloudRunId: 'w3txbmd3ba',
  cloudRunRegion: 'uc',
  amplitudeApiKey: 'fd8cbfd964b9a205b8678a39faae71b3',
  supabaseInstanceId: 'mfodonznyfxllcezufgr',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mb2RvbnpueWZ4bGxjZXp1ZmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc5ODgxNjcsImV4cCI6MTk4MzU2NDE2N30.RK8CA3G2_yccgiIFoxzweEuJ2XU5SoB7x7wBzMKitvo',
  twitchBotEndpoint: 'https://dev-twitch-bot.manifold.markets',
  apiEndpoint: 'api.dev.manifold.markets',
  expoConfig: {
    iosClientId:
      '134303100058-lioqb7auc8minvqt9iamuit2pg10pubt.apps.googleusercontent.com',
    iosClientId2:
      '134303100058-9464q86hhfloaij15dl9ekn6l39e3cv8.apps.googleusercontent.com',
    expoClientId:
      '134303100058-2uvio555s8mnhde20b4old97ptjnji3u.apps.googleusercontent.com',
    androidClientId:
      '134303100058-mu6dbubhks8khpqi3dq0fokqnkbputiq.apps.googleusercontent.com',
    androidClientId2:
      '134303100058-p29jv704pu0p8helj0pqruidi4lqss9j.apps.googleusercontent.com',
  },
  adminIds: [
    'pfKxvtgSEua5DxoIfiPXxR4fAWd2',
    '6hHpzvRG0pMq8PNJs7RZj2qlZGn2', // Ian
    'MxyCh2xvsFMFywwjg3Az0w4xP5B3', // Dev Manifold
    '2cO953kN1sTBpfbhPVnTjRNqLJh2', // Sinclair
  ],
}
