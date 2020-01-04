import React, { FC } from 'react'
import { ResponsiveContext } from 'grommet'

// Partials
import Desktop from './desktop'
import Mobile from './mobile'

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
}

// ===============================================
const Dialog: FC<Props> = ({ open, closeDialog, children }) => (
  <ResponsiveContext.Consumer>
    {size =>
      size.includes('small') ? (
        <Mobile open={open} closeDialog={closeDialog}>
          {children}
        </Mobile>
      ) : (
        <Desktop open={open} closeDialog={closeDialog}>
          {children}
        </Desktop>
      )
    }
  </ResponsiveContext.Consumer>
)

export default Dialog
