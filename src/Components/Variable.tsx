import React, { FC } from 'react'
import { Box, Text } from 'grommet'

// Types
import { TIconType } from '../Types'

// Atoms
import Icon from '../Atoms/icon'

// Utility
import { typeToUnit } from '../Utility'

// ===============================================
interface Props {
  type: string
  active: boolean
  value: string
  count: number
  index: number
}

// ===============================================
const Variable: FC<Props> = ({ type, active, value, count, index }) => (
  <Box direction="row" justify={index % 2 !== 0 ? 'start' : 'center'} align="center">
    <Icon type={type as TIconType} active={active} mini size={count > 1 ? '40%' : '15%'} />
    <Text size="xsmall" color={active ? 'headingActive' : 'headingInactive'}>
      {value + typeToUnit(type)}
    </Text>
  </Box>
)

export default Variable
