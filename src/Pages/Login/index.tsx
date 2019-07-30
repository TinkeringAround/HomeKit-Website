import React, { FC, useState, useContext } from 'react'
import { Box, ResponsiveContext, Form, FormField, Button, Heading, TextInput } from 'grommet'
import { auth, FirebaseError } from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

//Stylesheet
import './login.css'

// AppContext
import AppContext from '../../appContext'

// Custom Components
import Background from '../../Components/Background'
import theme from '../../theme'

//----------------------------------------------------
const Login: FC = () => {
  const { setUser } = useContext(AppContext)
  const [data, setData] = useState<{ email: string; password: string }>({
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

  const performLogin = (event: any) => {
    setTimeout(() => {
      auth()
        .signInWithEmailAndPassword(event.value.email, event.value.password)
        .then(response => {
          if (setUser) setUser(response.user)
        })
        .catch((error: FirebaseError) => {
          setLoading(false)
          console.log(error)
        })
    }, 2000)
    setLoading(true)
  }

  const changeValue = (target: any) => {
    target.type === 'text'
      ? setData({
          ...data,
          email: target.value
        })
      : setData({
          ...data,
          password: target.value
        })
  }

  return (
    <Background>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            width={size.includes('small') ? '85%' : '50%'}
            height={size.includes('small') ? '75%' : '60%'}
            justify="center"
            align="center"
            {...wrapper}
          >
            <Box
              width={size.includes('small') ? '80%' : '80%'}
              height={size.includes('small') ? '85%' : '90%'}
              justify="between"
            >
              <Heading level={1} responsive size="medium" textAlign="center" color="headingInverse">
                HomeKit
              </Heading>
              <Box flex="grow" justify="center" align="center">
                {!loading ? (
                  <Form onSubmit={performLogin} value={data} style={{ width: '85%' }}>
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
                      <Button
                        primary
                        type="submit"
                        label="Anmelden"
                        style={{
                          width: '100%',
                          height: '50px',
                          margin: '20px 0',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                  </Form>
                ) : (
                  <CircleSpinner size={75} color={theme.global.colors.darkYellow} />
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
