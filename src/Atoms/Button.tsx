import React, { FC } from 'react'
import styled from 'styled-components'

// Styles
import { colors } from '../Styles'

// Utility
import { hexToRGBA } from '../Utility'

// ===============================================
const SButton = styled.button`
  background: ${colors['medium']};
  border: none;
  border-radius: 10px;

  color: ${colors['light']};
  font-size: 1.25rem;
  font-weight: bold;

  transition: 0.2s all;
  outline: none;
  cursor: pointer;

  :hover {
    color: ${colors['white']};
    background: ${colors['yellow']};
    box-shadow: '0px 0px 5px 1px ' + ${hexToRGBA(colors['dark'], '0.2')};
  }
`

// ===============================================
interface Props {
  width?: string
  height?: string

  margin?: string
  padding?: string

  onClick?: any
  props?: any
}

// ===============================================
const Button: FC<Props> = ({
  width = '100%',
  height = 'auto',
  margin = '0',
  padding = '1rem',
  onClick,
  props,
  children
}) => (
  <SButton
    style={{
      width: width,
      height: height,

      margin: margin,
      padding: padding
    }}
    onClick={onClick}
    {...props}
  >
    {children}
  </SButton>
)

export default Button
