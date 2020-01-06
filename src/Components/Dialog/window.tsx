import React, { FC, useState, useEffect } from 'react'
import { Grommet, Box, ResponsiveContext } from 'grommet'
import { PoseGroup } from 'react-pose'
import { Portal } from 'react-portal'

// Styles
import { theme } from '../../Styles'

// Atoms
import { ASimple, ADialogDesktop } from '../../Atoms/animations'

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
  children?: any
  stagger?: boolean
}

// ===============================================
const Window: FC<Props> = ({ open, closeDialog, children, stagger = false }) => {
  const [showContent, setShowContent] = useState(open)

  // ===============================================
  useEffect(() => {
    if (!open && stagger) setTimeout(() => setShowContent(false), 500)
    else setShowContent(open)
  }, [open, showContent, stagger])

  return (
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
                {showContent && (
                  <ADialogDesktop
                    key="Dialog-Window"
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
                {showContent && <ASimple key="Dialog-Window-Background" onClick={closeDialog} />}
              </PoseGroup>
            )
          }}
        </ResponsiveContext.Consumer>
      </Grommet>
    </Portal>
  )
}

export default Window
