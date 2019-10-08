import React, { FC } from 'react'
import { Box } from 'grommet'

const Background: FC = ({ children }) => {
  return (
    <Box
      background="background"
      width={window.innerWidth + 'px'}
      height={window.innerHeight + 'px'}
      margin="0"
      style={{ position: 'relative' }}
    >
      {children}
    </Box>
  )
}

export default Background
