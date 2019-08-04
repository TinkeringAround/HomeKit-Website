import React, { FC } from 'react'
import { Box } from 'grommet'
import posed, { PoseGroup } from 'react-pose'
import { Portal } from 'react-portal'

// Utility
import { hexToRGBA } from '../Utility'

// Theme
import { theme } from '../theme'

// Animation:
const Background = posed(Box)({
  exit: { opacity: 0 },
  enter: { opacity: 1 }
})

const DialogContent = posed.div({
  exit: {
    opacity: 0,
    top: '5%'
  },
  enter: {
    opacity: 1,
    top: '10%'
  }
})

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
  children?: any
}

const Dialog: FC<Props> = ({ open, closeDialog, children }) => {
  const dialogContent: any = {
    position: 'absolute',
    zIndex: 701,
    backgroundColor: hexToRGBA(theme.global.colors.background, '1'),
    width: '50%',
    height: '80%',
    left: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  }

  const dialogBackground: any = {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 700,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }

  return (
    <Portal>
      <PoseGroup preEnterPose="exit">
        {open && (
          <DialogContent key="Dialog" style={dialogContent}>
            {/* Close Icon */}
            <Box width="90%" height="90%" margin="0">
              {children}
            </Box>
          </DialogContent>
        )}
        {open && (
          <Background key="Dialog-Background" style={dialogBackground} onClick={closeDialog} />
        )}
      </PoseGroup>
    </Portal>
  )
}

export default Dialog
