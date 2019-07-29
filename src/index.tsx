// IMPORTS
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import * as firebase from 'firebase/app'
import { Grommet } from 'grommet'

// Styles
import './index.css'

// Theme
import theme from './theme'

// Pages
import Login from './Pages/Login/'

//----------------------------------------------------------
// Firebase App Setup
const firebaseConfig = {
  apiKey: 'AIzaSyAaigf3dUFY8BH2e_5MtwbPiznTd_71D4o',
  authDomain: 'tinkeringaround-homekit.firebaseapp.com',
  databaseURL: 'https://tinkeringaround-homekit.firebaseio.com',
  projectId: 'tinkeringaround-homekit',
  storageBucket: '',
  messagingSenderId: '1082565869648',
  appId: '1:1082565869648:web:5342c05a145b4a1f'
}
firebase.initializeApp(firebaseConfig)

//----------------------------------------------------------
const App: FC = () => {
  return (
    <Grommet theme={theme} full>
      <Login />
    </Grommet>
  )
}

//----------------------------------------------------------
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
