import React, { FC } from 'react'
import { Box, Text } from 'grommet'
import { Sensor, Plus } from '../../Atoms/icons'
import * as moment from 'moment'

// Dummy Data
const data: Array<DeviceDataProps> = [
  {
    id: 211,
    type: 'sensor',
    lastUpdated: '1564663178',
    values: [
      {
        variable: 'temperature',
        value: '28'
      },
      {
        variable: 'humidity',
        value: '32'
      }
    ]
  },
  {
    id: 222,
    type: 'sensor',
    lastUpdated: '1564646038',
    values: [
      {
        variable: 'temperature',
        value: '26'
      }
    ]
  },
  {
    id: 233,
    type: 'sensor',
    lastUpdated: '1564663178',
    values: [
      {
        variable: 'humidity',
        value: '65'
      }
    ]
  }
]

//--------------------------------------------
type DeviceDataProps = {
  id: number
  type: string
  lastUpdated: string
  values: Array<object>
  // Ergänzen
}

interface DeviceProps {
  id: number | null
  name?: string
}

const Device: FC<DeviceProps> = ({ id, name }) => {
  // 1. fetch device data
  const deviceData: DeviceDataProps | undefined = data.find(dataItem => dataItem.id === id)

  // 2. Initalize
  let iotType: string | null = null
  const active =
    -moment.unix(parseInt(deviceData ? deviceData.lastUpdated : '')).diff(moment.now(), 'hours') < 1
      ? true
      : false

  if (deviceData) {
    switch (deviceData.type) {
      case 'sensor':
        iotType = 'sensor'
    }
  }

  const IoT: FC = () => {
    return (
      <Box width="100%" height="35%" align="center" margin="5% 0 0 0">
        <Text
          size="medium"
          truncate
          textAlign="center"
          color={active ? 'headingActive' : 'headingInactive'}
          style={{
            width: '90%'
          }}
        >
          {name}
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
    <Box className="hover square" background={id && active ? 'iotActive' : 'iotInactive'}>
      <Box className="square-content" align="center" justify={id ? 'start' : 'center'}>
        <Box
          width="30%"
          height="30%"
          justify="center"
          align="center"
          background={iotType && active ? 'iconWrapperActive' : 'iconWrapperInactive'}
          style={{ borderRadius: 10, marginTop: id ? '20%' : '0' }}
        >
          <Icon />
        </Box>
        {id && <IoT />}
      </Box>
    </Box>
  )
}

export default Device
