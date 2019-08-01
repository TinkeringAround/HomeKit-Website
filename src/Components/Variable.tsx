import React, { FC } from 'react'
import { Box, Text } from 'grommet'

// Atoms
import { Icon } from '../Atoms/Icons'

// Utility
import { typeToUnit } from '../Utility'

//---------------------------------------
interface Props {
  type: string
  active: boolean
  value: string
  count: number
  index: number
}

const Variable: FC<Props> = ({ type, active, value, count, index }) => (
  <Box direction="row" justify={index % 2 !== 0 ? 'start' : 'center'} align="center">
    <Icon type={type} active={active} mini width={count > 1 ? '40%' : '15%'} height="50%" />
    <Text size="xsmall" color={active ? 'headingActive' : 'headingInactive'}>
      {value + typeToUnit(type)}
    </Text>
  </Box>
)

export default Variable
