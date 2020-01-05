import React, { useState } from 'react'
import { Button as GrommetButton } from 'grommet'

// Styles
import { theme } from '../Styles'

// Utility
import { hexToRGBA } from '../Utility'

// ===============================================
interface Props {
  margin?: string
  width?: string
  height?: string
  onClick?: any
  props?: any
}

// ===============================================
const Button: React.FC<Props> = ({
  width = '100%',
  height = '50px',
  margin = '20px 0',
  onClick,
  props
}) => {
  const [hover, setHover] = useState(false)

  return (
    <GrommetButton
      primary
      style={{
        width: width,
        height: height,
        margin: margin,
        borderRadius: 10,
        borderColor: 'transparent',
        fontWeight: 'bold',
        transition: '0.2s all',
        boxShadow: hover
          ? '0px 0px 5px 1px ' + hexToRGBA(theme.global.colors['dark'], '0.2')
          : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      onClick={onClick}
      {...props}
    />
  )
}

export default Button
