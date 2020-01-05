import React, { FC } from 'react'
import { Box } from 'grommet'

// Atoms
import Icon from '../../Atoms/icon'

// ===============================================
interface Props {
  active: boolean
}

// ===============================================
const Battery: FC<Props> = ({ active }) => (
  <Box
    justify="center"
    align="center"
    style={{
      width: 20,
      height: 20,
      position: 'absolute',
      top: 10,
      left: 15
    }}
  >
    <Icon type="battery" active={active} mini />
  </Box>
)

export default Battery
