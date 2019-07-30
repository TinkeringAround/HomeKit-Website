import React, { FC, useState, useContext } from 'react'
import { Box, ResponsiveContext, Form, FormField, Button, Heading, TextInput } from 'grommet'
import firebase, { FirebaseError, User } from 'firebase'

//Stylesheet
import './login.css'

// AppContext
import AppContext from '../../appContext'

// Custom Components
import Background from '../../Components/Background'

//----------------------------------------------------
const Login: FC = () => {
  const { setUser } = useContext(AppContext)
  const [data, setData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  })

  const wrapper = {
    background: 'bgInverse',
    margin: 'auto',
    style: {
      borderRadius: '25px',
      boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.2)'
    }
  }

  const performLogin = (event: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(event.value.email, event.value.password)
      .then(response => {
        if (setUser) setUser(response.user)
      })
      .catch((error: FirebaseError) => console.log(error))
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
            {...wrapper}
          >
            {/* Test */}
            <Box
              width={size.includes('small') ? '80%' : '80%'}
              height={size.includes('small') ? '85%' : '90%'}
              margin="auto"
            >
              <Heading level={1} responsive size="medium" textAlign="center" color="heading">
                HomeKit
              </Heading>
              <Form onSubmit={performLogin} value={data}>
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
                      width: size.includes('small') ? '100%' : '50%',
                      height: '50px',
                      margin: '20px auto',
                      backgroundColor: 'active',
                      color: 'active'
                    }}
                  />
                </Box>
              </Form>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Background>
  )
}

export default Login
