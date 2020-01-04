import firebase from 'firebase'

// ===============================================
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
}

// ===============================================
export const initializeFirebaseApp = () => firebase.initializeApp(firebaseConfig)

// ===============================================
export const askForNotificationPermission = (): Promise<void> =>
  firebase.messaging().requestPermission()

// ===============================================
export const getToken = (): Promise<string | null> => {
  const result: Promise<string | null> = firebase
    .messaging()
    .getToken()
    .then(token => token)
    .catch(error => {
      console.log('An error occured retriving the messaging token.', error)
      return null
    })
  return result
}
