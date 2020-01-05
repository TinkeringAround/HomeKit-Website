import React, { FC } from 'react'
import { Box, Text } from 'grommet'

// Types
import { TDevice, TVariable } from '../../Types'

// Components
import Variable from '../Variable'

// ===============================================
interface Props {
  device: TDevice
  active: boolean
}

// ===============================================
const Content: FC<Props> = ({ device, active }) => (
  <Box width="100%" height="35%" align="center" margin="5% 0 0 0">
    <Box width="90%">
      <Text
        size="medium"
        textAlign="center"
        color={active ? 'headingActive' : 'headingInactive'}
        truncate
      >
        {device.name}
      </Text>
    </Box>
    <Box direction="row" justify="evenly" height="50%" width="90%">
      {device.values.map((variable: TVariable, index: number) => (
        <Variable
          key={'Device-' + device.id + '-Variable-' + index}
          type={variable.variable}
          value={variable.value}
          active={active}
          count={device.values.length}
          index={index}
        />
      ))}
    </Box>
  </Box>
)

export default Content
