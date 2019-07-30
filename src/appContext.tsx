import React from 'react'
import firebase from 'firebase'

type AppContextProps = {
  user: firebase.User | null
  setUser: (user: firebase.User | null) => void
}

export const appContext = React.createContext<Partial<AppContextProps>>({
  user: null
})

export default appContext
