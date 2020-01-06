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
      width: '2rem',
      height: '2rem',
      position: 'absolute',
      top: '.5rem',
      left: '1rem'
    }}
  >
    <Icon type="battery" active={active} activeColor="white" />
  </Box>
)

export default Battery
