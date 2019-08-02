import React, { FC } from 'react'
import { Box } from 'grommet'
import posed, { PoseGroup } from 'react-pose'
import { Portal } from 'react-portal'

// Animation:
const Background = posed.div({
  exit: { opacity: 0 },
  enter: { opacity: 1 }
})

// ===============================================
interface Props {
  children: any
  open: boolean
}

const Dialog: FC<Props> = ({ children, open = false }) => {
  // Animation:
  const Dialog = posed.div({
    exit: {
      opacity: 0,
      top: '5%'
    },
    enter: {
      opacity: 1,
      top: '10%'
    }
  })
  const background = {
    //position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 700,

    width: '100vw',
    height: '100vh',

    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
  const dialog = {
    //position: 'absolute',
    left: '10%',
    width: '80%',
    height: '80%',
    zIndex: 701,

    backgroundColor: 'rgb(255,255,255)',

    display: 'flex',
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return <Portal>{children}</Portal>
}

export default Dialog

/*
 <PoseGroup preEnterPose="exit">
        {open && <div />}
        {open && <Background key="Background" style={background} onClick={close} />}
      </PoseGroup>
*/

/*
  <Dialog key="Dialog" style={dialog}>
            <Box
              width="fit-content"
              height="fit-content"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem'
              }}
              onClick={close}
            >
              </Box>
              <Box width="90%" height="90%" margin="0">
                {children}
              </Box>
            </Dialog>
            */
