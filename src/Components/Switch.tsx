import React, { FC, useState } from 'react'
import { Box, ResponsiveContext, Text } from 'grommet'

// Types
import { TIconType } from '../Types'

// Atoms
import Icon from '../Atoms/icon'

// Theme
import { theme } from '../Styles'

// Utility
import { hexToRGBA } from '../Utility/'

// ===============================================
interface Props {
  onClick: any
  icon: TIconType
  text: string
}

// ===============================================
const Switch: FC<Props> = ({ onClick = null, icon, text }) => {
  const [hover, setHover] = useState(false)

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <>
            <Box
              className="animated"
              direction="row"
              align="center"
              style={{ position: 'absolute', top: '0.2em', right: isMobile ? 100 : 90 }}
            >
              <Text size="0.8em" color="headingInactive" margin="0px 5px">
                {'Zu den ' + text}
              </Text>
              <Icon type="arrowRight" active={false} size="1em" />
            </Box>
            <Box
              className="clickable"
              background="iconWrapperInactive"
              justify="center"
              align="center"
              style={{
                top: -10,
                right: isMobile ? 50 : 40,
                width: 40,
                height: 40,
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
              <Icon type={icon} active={false} size="60%" />
            </Box>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Switch
