import React from 'react'
import { Box } from 'grommet'

const Background: React.FC = ({ children }) => {
  return (
    <Box background="background" width="100vw" height={window.innerHeight + 'px'} margin="0">
      {children}
    </Box>
  )
}

export default Background
