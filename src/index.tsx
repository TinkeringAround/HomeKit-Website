// IMPORTS
import React, { FC, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import firebase, { User } from 'firebase/app'
import { Grommet } from 'grommet'
import { initializeFirebaseApp, askForNotificationPermission, getToken } from './firebase'

// Styles
import './index.css'

// Theme
import { theme } from './theme'

// Pages
import Login from './Pages/Login/'
import Home from './Pages/Home/'

//----------------------------------------------------------
initializeFirebaseApp()

//----------------------------------------------------------
const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

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
    if (user && !authenticated) {
      console.log('Authenticated User: ', user)
      setAuthenticated(true)
    } else if (!user && authenticated) {
      console.log('User logout!')
      setAuthenticated(false)
    }
  })

  return (
    <Grommet theme={theme} full>
      {!authenticated ? <Login /> : <Home />}
    </Grommet>
  )
}

//----------------------------------------------------------
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register()
