import React, { FC, useState } from 'react'
import { Box, ResponsiveContext, Form, FormField, Heading, TextInput, ThemeContext } from 'grommet'
import { auth, FirebaseError } from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

//Stylesheet
import './login.css'

// Types
import { TCredential } from '../../Types'

// Atoms
import Button from '../../Atoms/Button'

// Custom Components
import Background from '../../Components/Background'

//----------------------------------------------------
const Login: FC = () => {
  const [credentials, setCredentials] = useState<TCredential>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  const wrapper = {
    background: 'bgInverse',
    margin: 'auto',
    style: {
      borderRadius: '25px',
      boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.2)'
    }
  }

  const performLogin = () => {
    setTimeout(() => {
      auth()
        .setPersistence(auth.Auth.Persistence.SESSION)
        .then(() => {
          auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .catch((error: FirebaseError) => {
              console.log(error)
            })
        })
    }, 2000)
    setLoading(true)
  }

  const changeValue = (target: any) => {
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

  return (
    <Background>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            width={size.includes('small') ? '85%' : '500px'}
            height={size.includes('small') ? '70%' : '500px'}
            justify="center"
            align="center"
            {...wrapper}
          >
            <Box width="80%" height="90%" justify="between">
              <Heading level="1" responsive size="medium" textAlign="center" color="headingInverse">
                HomeKit
              </Heading>
              <Box flex="grow" justify="center" align="center">
                {!loading ? (
                  <Form onSubmit={performLogin} style={{ width: '100%' }}>
                    <FormField type="email" name="email" className="Formfield">
                      <TextInput
                        placeholder="Email"
                        onChange={(event: any) => changeValue(event.target)}
                      />
                    </FormField>
                    <FormField type="password" name="password" className="Formfield">
                      <TextInput
                        type="password"
                        placeholder="Passwort"
                        onChange={(event: any) => changeValue(event.target)}
                      />
                    </FormField>
                    <Box justify="center" align="center">
                      <Button props={{ type: 'submit', label: 'Anmelden' }} />
                    </Box>
                  </Form>
                ) : (
                  <ThemeContext.Consumer>
                    {theme => {
                      //@ts-ignore
                      return <CircleSpinner size={75} color={theme.global.colors.darkYellow} />
                    }}
                  </ThemeContext.Consumer>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Background>
  )
}

export default Login
