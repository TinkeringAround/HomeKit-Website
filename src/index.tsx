// IMPORTS
import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import firebase, { User } from 'firebase/app'
import { Grommet } from 'grommet'

// Styles
import './index.css'

// Theme
import { theme } from './theme'

// Pages
import Login from './Pages/Login/'
import Home from './Pages/Home/'

//----------------------------------------------------------
// Firebase App Setup
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
}
firebase.initializeApp(firebaseConfig)

//----------------------------------------------------------
const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  firebase.auth().onAuthStateChanged((user: User | null) => {
    if (user && !authenticated) {
      console.log('Authenticated User: ', user)
      setAuthenticated(true)
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
serviceWorker.unregister()
