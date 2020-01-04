import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

// Types
import { TIconType } from '../Types'

// Style
import { theme } from '../Styles'

// Utility
import { hexToRGBA } from '../Utility/'

// Atoms
import Icon from './icon'
const SIcon = styled(Box)`
  border-radius: 10px;
  box-shadow: none;

  transition: 0.2s all;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 5px 1px ${hexToRGBA(theme.global.colors['iconWrapperInactive'], '0.2')};
  }
`

// ===============================================
interface Props {
  wrapper?: string
  icon?: string
  iconType: TIconType | null
  margin?: string
  onClick?: any
  active?: boolean
}

// ===============================================
const IconButton: React.FC<Props> = ({
  wrapper = '50px',
  icon = undefined,
  iconType,
  margin = '0 0 0 .5rem',
  onClick = null,
  active = false
}) => (
  <SIcon
    background={active ? 'iconWrapperActive' : 'iconWrapperInactive'}
    justify="center"
    align="center"
    width={wrapper}
    height={wrapper}
    onClick={onClick}
    style={{ margin: margin }}
  >
    <Icon type={iconType} active={active} size={icon} />
  </SIcon>
)
export default IconButton
