import React, { useState } from 'react'
import { Box } from 'grommet'

// Atoms
import { Icon } from '../Atoms/Icons'

// Theme
import { theme } from '../theme'

// Utility
import { hexToRGBA } from '../Utility/'

//--------------------------------------
interface Props {
  onClick?: any
}

const Settings: React.FC<Props> = ({ onClick = null }) => {
  const [hover, setHover] = useState(false)

  return (
    <Box
      background="iconWrapperInactive"
      justify="center"
      align="center"
      style={{
        top: 30,
        right: 30,
        width: 50,
        height: 50,
        position: 'absolute',
        borderRadius: 10,
        transition: '0.2s all',
        transform: hover ? 'scale(1.01)' : 'scale(1)',
        boxShadow: hover
          ? '0px 0px 5px 1px ' + hexToRGBA(theme.global.colors.iconWrapperInactive, '0.2')
          : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      onClick={onClick}
    >
      <Icon type="settings" active={false} width="60%" height="60%" />
    </Box>
  )
}

export default Settings
