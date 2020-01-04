import React, { FC, useState } from 'react'
import { Box, ResponsiveContext, Form, FormField, Heading, TextInput } from 'grommet'
import { auth, FirebaseError } from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

// Styles
import './login.css'
import { theme } from '../../Styles'

// Types
import { TCredential } from '../../Types'

// Atoms
import Button from '../../Atoms/button'

// ===============================================
const Login: FC = () => {
  const [credentials, setCredentials] = useState<TCredential>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  // ===============================================
  const login = () => {
    setTimeout(() => {
      auth()
        .setPersistence(auth.Auth.Persistence.SESSION)
        .then(() => {
          auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .catch((error: FirebaseError) => {
              console.log(error)
              setLoading(false)
            })
        })
    }, 500)
    setLoading(true)
  }

  const updateCredentials = (target: any) => {
    target.type === 'text'
      ? setCredentials({
          ...credentials,
          email: target.value
        })
      : setCredentials({
          ...credentials,
          password: target.value
        })
  }

  // ===============================================
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <Box
            width={isMobile ? '100%' : '500px'}
            height={isMobile ? '100%' : '500px'}
            justify="center"
            align="center"
            background="bgInverse"
            margin="auto"
            style={{
              borderRadius: isMobile ? 0 : 15,
              boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.2)'
            }}
          >
            <Box width="80%" height="90%" justify="between">
              <Heading level="1" responsive size="medium" textAlign="center" color="headingInverse">
                HomeKit
              </Heading>
              <Box flex="grow" justify="center" align="center">
                {!loading ? (
                  <Form onSubmit={login} style={{ width: '100%' }}>
                    <FormField type="email" name="email" className="Formfield">
                      <TextInput
                        type="text"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(event: any) => updateCredentials(event.target)}
                      />
                    </FormField>
                    <FormField type="password" name="password" className="Formfield">
                      <TextInput
                        type="password"
                        placeholder="Passwort"
                        value={credentials.password}
                        onChange={(event: any) => updateCredentials(event.target)}
                      />
                    </FormField>
                    <Box justify="center" align="center">
                      <Button props={{ type: 'submit', label: 'Anmelden' }} />
                    </Box>
                  </Form>
                ) : (
                  <CircleSpinner size={75} color={theme.global.colors['darkYellow']} />
                )}
              </Box>
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Login
