import React, { FC } from 'react'
import { Box, Text } from 'grommet'
import * as moment from 'moment'

// Atoms
import { Sensor, Plus, Temperature, Humidity } from '../Atoms/icons'

// Custom Components
import Variable from './Variable'

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
  values: Array<VariableProps>
}

type VariableProps = {
  variable: string
  value: string
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
    -moment.unix(parseInt(deviceData ? deviceData.lastUpdated : '')).diff(moment.now(), 'hours') < 2
      ? true
      : false

  if (deviceData) {
    switch (deviceData.type) {
      case 'sensor':
        iotType = 'sensor'
    }
  }

  const Content: FC = () => {
    return (
      <Box width="100%" height="35%" align="center" margin="5% 0 0 0">
        <Box width="90%">
          <Text
            size="medium"
            truncate
            textAlign="center"
            color={active ? 'headingActive' : 'headingInactive'}
          >
            {name}
          </Text>
        </Box>
        <Box direction="row" justify="evenly" height="50%" width="90%">
          {deviceData &&
            deviceData.values.map((variable: VariableProps, index) => {
              const MiniIcon: FC = () => {
                switch (variable.variable) {
                  case 'temperature':
                    return (
                      <Temperature
                        active={active}
                        mini
                        width={12.5 / deviceData.values.length + '%'}
                        height="60%"
                      />
                    )
                  case 'humidity':
                    return (
                      <Humidity
                        active={active}
                        mini
                        width={12.5 / deviceData.values.length + '%'}
                        height="60%"
                      />
                    )
                }
                return <React.Fragment />
              }

              return (
                <Box direction="row" justify="center">
                  <MiniIcon />
                  <Text size="xsmall">{variable.value}</Text>
                </Box>
              )
            })}
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
        {id && <Content />}
      </Box>
    </Box>
  )
}

export default Device
