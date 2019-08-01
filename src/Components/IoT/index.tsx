import React, { FC } from 'react'
import { Box, Text } from 'grommet'
import { Sensor, Plus } from '../../Atoms/icons'

//--------------------------------------------
type DataProps = {
  name: string
  type: string
  values: Array<object>
  // Ergänzen
}

interface Props {
  data: DataProps | null
}

const IoT: FC<Props> = ({ data }) => {
  let iotType: string | null = null
  let active = true // check activity status by timestamp
  if (data) {
    switch (data.type) {
      case 'sensor':
        iotType = 'sensor'
    }
  }

  const IoT: FC = () => {
    return (
      <Box width="100%" height="35%" align="center" margin="5% 0 0 0">
        <Text size="large" color={active ? 'headingActive' : 'headingInactive'}>
          {data && data.name}
        </Text>
        <Box background="red" direction="row" justify="evenly">
          {/* data values - type dependant */}
        </Box>
      </Box>
    )
  }

  const Icon: FC = () => {
    if (iotType) {
      switch (iotType) {
        case 'sensor':
          return <Sensor active={active} />
      }
    }
    return <Plus active={false} />
  }

  return (
    <Box className="hover square" background={iotType && active ? 'iotActive' : 'iotInactive'}>
      <Box className="square-content" align="center" justify={iotType ? 'start' : 'center'}>
        <Box
          width="30%"
          height="30%"
          justify="center"
          align="center"
          background={iotType && active ? 'iconWrapperActive' : 'iconWrapperInactive'}
          style={{ borderRadius: 10, marginTop: iotType ? '20%' : '0' }}
        >
          <Icon />
        </Box>
        {iotType && <IoT />}
      </Box>
    </Box>
  )
}

export default IoT
