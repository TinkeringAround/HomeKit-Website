import React, { FC } from 'react'
import { Box } from 'grommet'

// ===============================================
const Layout: FC = ({ children }) => (
  <Box
    background="white"
    width={window.innerWidth + 'px'}
    height={window.innerHeight + 'px'}
    margin="0"
    style={{ position: 'relative' }}
  >
    <Box
      height="5rem"
      width="100%"
      background="yellow"
      style={{ position: 'fixed', zIndex: 0, top: 0 }}
    ></Box>
    {children}
  </Box>
)

export default Layout
