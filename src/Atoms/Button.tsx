import React, { useState } from 'react'
import { Button as GrommetButton, ThemeContext } from 'grommet'

// Utility
import { hexToRGBA } from '../Utility/'

//---------------------------------------------
interface Props {
  margin?: string
  width?: string
  height?: string
  onClick?: any
  props?: any
}

const Button: React.FC<Props> = ({
  width = '100%',
  height = '50px',
  margin = '20px 0',
  onClick,
  props
}) => {
  const [hover, setHover] = useState(false)

  return (
    <ThemeContext.Consumer>
      {theme => {
        //@ts-ignore
        const color = theme.global.colors.iconActive.toString(16)
        return (
          <GrommetButton
            primary
            style={{
              width: width,
              height: height,
              margin: margin,
              fontWeight: 'bold',
              transition: '0.2s all',
              transform: hover ? 'scale(1.01)' : 'scale(1)',
              boxShadow: hover ? '0px 0px 5px 1px ' + hexToRGBA(color, '0.2') : 'none'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            onClick={onClick}
            {...props}
          />
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Button
