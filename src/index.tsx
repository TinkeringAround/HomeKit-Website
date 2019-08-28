// IMPORTS
import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import firebase, { User } from 'firebase/app'
import { Grommet } from 'grommet'
import { initializeFirebaseApp } from './firebase'

// Styles
import './index.css'

// Theme
import { theme } from './theme'

// Pages
import Login from './Pages/Login/'
import Home from './Pages/Home/'

//----------------------------------------------------------
// Firebase App Setup
initializeFirebaseApp()

//----------------------------------------------------------
const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

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
