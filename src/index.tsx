// IMPORTS
import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import firebaseApp from 'firebase/app'
import { Grommet } from 'grommet'

// Styles
import './index.css'

// Theme
import { theme } from './theme'

// Context
import AppContext from './appContext'

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
firebaseApp.initializeApp(firebaseConfig)

//----------------------------------------------------------
const App: FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null)

  const appContext = {
    user: user,
    setUser: (user: firebase.User | null) => setUser(user)
  }

  return (
    <Grommet theme={theme} full>
      <AppContext.Provider value={appContext}>{!user ? <Login /> : <Home />}</AppContext.Provider>
    </Grommet>
  )
}

//----------------------------------------------------------
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
