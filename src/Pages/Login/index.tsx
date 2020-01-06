import React, { FC, useState } from 'react'
import { Box, ResponsiveContext, Form, FormField, Heading, TextInput, Image } from 'grommet'
import { auth, FirebaseError } from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'
import styled from 'styled-components'

// Styles
import { colors } from '../../Styles'

// Types
import { TCredential } from '../../Types'

// Atoms
import Button from '../../Atoms/button'

// Assets
import Logo from '../../Assets/logo.png'

// ===============================================
const SFormField = styled(FormField)`
  margin-bottom: 2rem;

  div {
    border-bottom-color: ${colors['white']};

    input {
      font-size: 1rem;
      color: ${colors['dark']};
      background: ${colors['light']}
      padding: 1rem;
      border-radius: 10px;

      ::placeholder {
        color: ${colors['medium']};
      }
    }
  }
`

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
            height={isMobile ? 'calc(100% - 5rem)' : '450px'}
            justify="center"
            align="center"
            margin={isMobile ? '5rem 0 0' : 'auto'}
          >
            <Box
              width={isMobile ? '85%' : '80%'}
              height="90%"
              justify={isMobile ? 'evenly' : 'center'}
            >
              <Box
                width="100%"
                height={isMobile ? '5rem' : '6rem'}
                align="center"
                direction="row"
                margin={isMobile ? '0' : '0 0 2rem'}
              >
                <Image height="100%" alt="HomeKit Logo" src={Logo} />
                <Heading
                  level="1"
                  size={isMobile ? '3.5rem' : '4.5rem'}
                  margin="0 0 0 1rem"
                  textAlign="center"
                  color="dark"
                  responsive
                >
                  HomeKit
                </Heading>
              </Box>

              {/* Formular */}
              <Box flex={isMobile ? undefined : 'grow'} justify="center" align="center">
                {!loading ? (
                  <Form onSubmit={login} style={{ width: '100%' }}>
                    {/* Inputs */}
                    <SFormField type="email" name="email">
                      <TextInput
                        type="text"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(event: any) => updateCredentials(event.target)}
                      />
                    </SFormField>
                    <SFormField type="password" name="password">
                      <TextInput
                        type="password"
                        placeholder="Passwort"
                        value={credentials.password}
                        onChange={(event: any) => updateCredentials(event.target)}
                      />
                    </SFormField>

                    {/* Button */}
                    <Button props={{ type: 'submit' }}>Anmelden</Button>
                  </Form>
                ) : (
                  <CircleSpinner size={75} color={colors['yellow']} />
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
