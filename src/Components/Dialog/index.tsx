import React, { FC } from 'react'
import { ResponsiveContext } from 'grommet'

// Partials
import Window from './window'
import Overlay from './overlay'

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
  stagger?: boolean
}

// ===============================================
const Dialog: FC<Props> = ({ open, closeDialog, children, stagger = false }) => (
  <ResponsiveContext.Consumer>
    {size =>
      size.includes('small') ? (
        <Overlay open={open} closeDialog={closeDialog} stagger={stagger}>
          {children}
        </Overlay>
      ) : (
        <Window open={open} closeDialog={closeDialog} stagger={stagger}>
          {children}
        </Window>
      )
    }
  </ResponsiveContext.Consumer>
)

export default Dialog
