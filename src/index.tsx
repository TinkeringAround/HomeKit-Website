// IMPORTS
import React, { FC, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './Driver/serviceWorker'
import firebase, { User } from 'firebase/app'
import { Grommet } from 'grommet'
import { initializeFirebaseApp, askForNotificationPermission, getToken } from './Driver/firebase'

// Styles
import './Styles/global.css'

// Theme
import { theme } from './Styles'

// Pages
import Login from './Pages/Login/'
import Dashboard from './Pages/Dashboard'

// Components
import Layout from './Components/Layout'

// ===============================================
initializeFirebaseApp()

// ===============================================
const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

  // ===============================================
  useEffect(() => {
    if (!token && authenticated) {
      try {
        askForNotificationPermission()
          .then(async () => {
            const token = await getToken()
            console.log('Token: ', token)
            setToken(token)

            // Update token in database
            firebase
              .database()
              .ref('/token')
              .once('value')
              .then(snapshot => {
                const oldToken = snapshot.val()
                if (oldToken !== token) snapshot.ref.set(token)
              })

            firebase.messaging().onTokenRefresh(() => {
              firebase
                .messaging()
                .getToken()
                .then(token => setToken(token))
                .catch(error =>
                  console.log('An error occured retriving the refreshed token.', error)
                )
            })
          })
          .catch(error => console.log('No Notification permission granted.', error))
      } catch (error) {
        console.log('No supported browser.')
      }
    }
  })

  firebase.auth().onAuthStateChanged((user: User | null) => {
    if (user && !authenticated) setAuthenticated(true)
    else if (!user && authenticated) setAuthenticated(false)
  })

  // ===============================================
  return (
    <Grommet theme={theme} full>
      <Layout>{!authenticated ? <Login /> : <Dashboard />}</Layout>
    </Grommet>
  )
}

//----------------------------------------------------------
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register()
