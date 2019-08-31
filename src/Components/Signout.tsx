import React, { FC, useState } from 'react'
import { Box, ResponsiveContext } from 'grommet'

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

const Signout: FC<Props> = ({ onClick = null }) => {
  const [hover, setHover] = useState(false)

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const iconSize = isMobile ? 25 : 30
        return (
          <Box
            className="clickable"
            background="iconWrapperInactive"
            justify="center"
            align="center"
            style={{
              top: -10,
              right: isMobile ? 0 : -10,
              width: 40,
              height: 40,
              position: 'absolute',
              borderRadius: 10,
              transition: '0.2s all',
              transform: hover ? 'scale(1.01)' : 'scale(1)',
              boxShadow: hover
                ? '0px 0px 5px 0px ' + hexToRGBA(theme.global.colors.iconWrapperInactive, '0.2')
                : 'none'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            onClick={onClick}
          >
            <Icon type="signout" active={false} width={iconSize + 'px'} height={iconSize + 'px'} />
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Signout
