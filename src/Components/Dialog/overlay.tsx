import React, { FC, useState, useEffect } from 'react'
import { Grommet, Box } from 'grommet'
import { PoseGroup } from 'react-pose'
import { Portal } from 'react-portal'

// Theme
import { theme } from '../../Styles'

// Atoms
import { ASimple, ADialogMobile } from '../../Atoms/animations'

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
  children?: any
  stagger?: boolean
}

// ===============================================
const Overlay: FC<Props> = ({ open, closeDialog, children, stagger = false }) => {
  const [showContent, setShowContent] = useState(open)

  // ===============================================
  useEffect(() => {
    if (!open && stagger) setTimeout(() => setShowContent(false), 500)
    else setShowContent(open)
  }, [open, showContent, stagger])

  // ===============================================
  return (
    <Portal>
      <Grommet theme={theme}>
        <PoseGroup preEnterPose="exit">
          {showContent && (
            <ADialogMobile key="Dialog-Mobile">
              {open && (
                <Box width="90%" height="90%" margin="0" style={{ position: 'relative' }}>
                  {children}
                </Box>
              )}
            </ADialogMobile>
          )}
          {showContent && <ASimple key="Dialog-Mobile-Background" onClick={closeDialog} />}
        </PoseGroup>
      </Grommet>
    </Portal>
  )
}

export default Overlay
