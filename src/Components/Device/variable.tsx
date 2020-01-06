import React, { FC } from 'react'
import { Box, Text } from 'grommet'

// Types
import { TVariableType } from '../../Types'

// Atoms
import Icon from '../../Atoms/icon'

// Utility
import { typeToUnit } from '../../Utility'

// ===============================================
interface Props {
  type: TVariableType
  active: boolean
  value: string
  count: number
}

// ===============================================
const Variable: FC<Props> = ({ type, active, value, count }) => (
  <Box direction="row" justify="center" align="center">
    <Icon
      type={type}
      active={active}
      activeColor="yellow"
      height={count > 1 ? '80%' : '15%'}
      width="25%"
    />
    <Text size=".8rem" color={active ? 'yellow' : 'medium'}>
      {value + typeToUnit(type)}
    </Text>
  </Box>
)

export default Variable
