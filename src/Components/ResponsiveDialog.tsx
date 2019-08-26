import React, { FC } from 'react'
import { ResponsiveContext } from 'grommet'
import Dialog from './Dialog'
import Overlay from './Overlay'

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
}

const ResponsiveDialog: FC<Props> = ({ open, closeDialog, children }) => {
  return (
    <ResponsiveContext.Consumer>
      {(size: string) => {
        const isMobile = size.includes('small')

        return isMobile ? (
          <Overlay open={open} closeDialog={closeDialog}>
            {children}
          </Overlay>
        ) : (
          <Dialog open={open} closeDialog={closeDialog}>
            {children}
          </Dialog>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default ResponsiveDialog
