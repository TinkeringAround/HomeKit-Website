import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
}

export const initializeFirebaseApp = () => {
  firebase.initializeApp(firebaseConfig)

  try {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.')
        return firebase.messaging().getToken()
      })
      .then(token => console.log('Token: ', token))
      .catch(err => console.log('An error occurred while retrieving token. ', err))
  } catch (error) {
    console.error(error)
  }
}
