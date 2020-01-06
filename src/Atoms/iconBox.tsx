import React, { FC } from 'react'
import { Box } from 'grommet'

// Types
import { TIconType } from '../Types'

// Atoms
import Icon from './icon'

// ===============================================
interface Props {
  type?: TIconType
  active: boolean
  color?: string
  size?: string
  iconSize?: string
  margin?: string
  tooltip?: string | null
}

// ===============================================
const IconBox: FC<Props> = ({
  type = 'plus',
  active,
  color = null,
  size = '30%',
  iconSize = '50%',
  margin = '0',
  tooltip = null
}) => (
  <Box
    width={size}
    height={size}
    margin={margin}
    justify="center"
    align="center"
    background={color ? color : active ? 'lightYellow' : 'light'}
    style={{ borderRadius: 10 }}
    data-tip={tooltip}
  >
    <Icon type={type} active={active} size={iconSize} />
  </Box>
)

export default IconBox
