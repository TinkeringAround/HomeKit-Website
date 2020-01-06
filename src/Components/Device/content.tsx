import React, { FC } from 'react'
import { Box, Text } from 'grommet'

// Types
import { TDevice, TVariable } from '../../Types'

// Atoms
import IconBox from '../../Atoms/iconBox'

// Components
import Variable from './variable'

// ===============================================
interface Props {
  device: TDevice
  active: boolean
}

// ===============================================
const Content: FC<Props> = ({ device, active }) => (
  <Box width="100%" height="100%" align="center" justify="center">
    {/* Name */}
    <Box width="90%">
      <Text
        size="medium"
        textAlign="center"
        weight="bold"
        color={active ? 'yellow' : 'medium'}
        truncate
      >
        {device.name}
      </Text>
    </Box>

    {/* Icon */}
    <IconBox active={active} type={device.type} margin=".75rem 0 1rem" />

    {/* Data */}
    <Box direction="row" justify="evenly" width="90%">
      {device.values.map((variable: TVariable, index: number) => (
        <Variable
          key={'Device-' + device.id + '-Variable-' + index}
          type={variable.variable}
          value={variable.value}
          active={active}
          count={device.values.length}
        />
      ))}
    </Box>
  </Box>
)

export default Content
