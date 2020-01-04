import React, { FC } from 'react'
import { Grommet, Box, ResponsiveContext } from 'grommet'
import { PoseGroup } from 'react-pose'
import { Portal } from 'react-portal'

// Theme
import { theme } from '../../Styles'

// Atoms
import { ASimple, ADialogDesktop } from '../../Atoms/animations'

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
  children?: any
}

// ===============================================
const Desktop: FC<Props> = ({ open, closeDialog, children }) => (
  <Portal>
    <Grommet theme={theme}>
      <ResponsiveContext.Consumer>
        {size => {
          const isMobile = size.includes('small')
          const width = isMobile ? '90%' : '50%'
          const height = isMobile ? '85%' : '80%'
          const left = isMobile ? '5%' : '25%'

          return (
            <PoseGroup preEnterPose="exit">
              {open && (
                <ADialogDesktop
                  key="Dialog"
                  style={{
                    width: width,
                    height: height,
                    left: left,
                    cursor: 'default'
                  }}
                >
                  {/* Close Icon */}
                  <Box width="90%" height="90%" margin="0" style={{ position: 'relative' }}>
                    {children}
                  </Box>
                </ADialogDesktop>
              )}
              {open && <ASimple key="Dialog-Desktop-Background" onClick={closeDialog} />}
            </PoseGroup>
          )
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  </Portal>
)

export default Desktop
