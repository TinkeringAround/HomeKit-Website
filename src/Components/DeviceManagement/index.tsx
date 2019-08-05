import React, { FC } from 'react'
import { Text, Heading } from 'grommet'

// Types
import { TDevice } from '../../Types'

// Custom Components
import { Container } from './components'

//----------------------------------------------
interface Props {
  devices: Array<TDevice>
}

const DeviceManagement: FC<Props> = () => {
  return (
    <>
      <Heading level="3" size="large" color="headingInactive" margin="50px 0px 0px 0px">
        Geräte und Sensoren
      </Heading>
      <Container>
        <Text>Sensorname:</Text>
        <Text>last active: 19.09.2018</Text>
      </Container>
    </>
  )
}

export default DeviceManagement
