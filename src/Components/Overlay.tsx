import React, { FC } from 'react'
import { Grommet, Box } from 'grommet'
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

const Content = posed.div({
  exit: {
    opacity: 0,
    bottom: '-15%'
  },
  enter: {
    opacity: 1,
    bottom: '0%'
  }
})

// ===============================================
interface Props {
  open: boolean
  closeDialog: any
  children?: any
}

const Overlay: FC<Props> = ({ open, closeDialog, children }) => {
  const content: any = {
    position: 'absolute',
    zIndex: 701,
    backgroundColor: hexToRGBA(theme.global.colors.background, '1'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    height: '90%'
  }

  const background: any = {
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
      <Grommet theme={theme}>
        <PoseGroup preEnterPose="exit">
          {open && (
            <Content key="Overlay" style={content}>
              <Box width="90%" height="90%" margin="0" style={{ position: 'relative' }}>
                {children}
              </Box>
            </Content>
          )}
          {open && <Background key="Overlay-Background" style={background} onClick={closeDialog} />}
        </PoseGroup>
      </Grommet>
    </Portal>
  )
}

export default Overlay
