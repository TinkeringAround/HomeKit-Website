import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

// Types
import { TIconType } from '../Types'

// Atoms
import Icon from './icon'

// ===============================================
const SIcon = styled(Box)`
  border-radius: 10px;
  box-shadow: none;

  transition: 0.2s all;
  cursor: pointer;
`

// ===============================================
interface Props {
  wrapper?: string
  icon?: string
  iconType: TIconType | null
  margin?: string
  onClick?: any
  active?: boolean
  tooltip?: string | null
}

// ===============================================
const IconButton: React.FC<Props> = ({
  wrapper = '3rem',
  icon = '50%',
  iconType,
  margin = '0 0 0 .5rem',
  onClick = null,
  active = false,
  tooltip = null
}) => (
  <SIcon
    background="white"
    justify="center"
    align="center"
    width={wrapper}
    height={wrapper}
    onClick={onClick}
    style={{ margin: margin }}
    data-tip={tooltip}
  >
    <Icon type={iconType} active={active} size={icon} />
  </SIcon>
)
export default IconButton
