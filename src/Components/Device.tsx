import React, { FC, useState } from 'react'
import { Box, Text } from 'grommet'

// Atoms
import { Icon } from '../Atoms/Icons'

// Custom Components
import Variable from './Variable'

// Utility
import { deviceIsActive, hexToRGBA } from '../Utility'
import { theme } from '../theme'

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
  const [hover, setHover] = useState(false)
  // 1. fetch device data
  const deviceData: DeviceDataProps | undefined = data.find(dataItem => dataItem.id === id)

  // 2. Initalize
  const type = id && deviceData ? deviceData.type : null
  const active = deviceIsActive(deviceData ? deviceData.lastUpdated : '')
  const color = id && active ? theme.global.colors.deviceActive : theme.global.colors.deviceInactive

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
              return (
                <Variable
                  key={'Device-' + id + '-Variable-' + index}
                  type={variable.variable}
                  value={variable.value}
                  active={active}
                  count={deviceData.values.length}
                  index={index}
                />
              )
            })}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      className="square"
      background={id && active ? 'deviceActive' : 'deviceInactive'}
      style={{
        transition: '0.2s all',
        transform: hover ? 'scale(1.01)' : 'scale(1)',
        boxShadow: hover ? '0px 0px 5px 1px ' + hexToRGBA(color, '0.2') : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
    >
      <Box className="square-content" align="center" justify={id ? 'start' : 'center'}>
        <Box
          width="30%"
          height="30%"
          justify="center"
          align="center"
          background={id && active ? 'iconWrapperActive' : 'iconWrapperInactive'}
          style={{ borderRadius: 10, marginTop: id ? '20%' : '0' }}
        >
          <Icon
            type={type}
            active={active}
            width={type ? '80%' : '40%'}
            height={type ? '80%' : '40%'}
          />
        </Box>
        {id && <Content />}
      </Box>
    </Box>
  )
}

export default Device
