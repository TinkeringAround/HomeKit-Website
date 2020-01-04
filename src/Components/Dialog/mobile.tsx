import React, { FC } from 'react'
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
}

// ===============================================
const Mobile: FC<Props> = ({ open, closeDialog, children }) => (
  <Portal>
    <Grommet theme={theme}>
      <PoseGroup preEnterPose="exit">
        {open && (
          <ADialogMobile key="Dialog-Mobile">
            <Box width="90%" height="90%" margin="0" style={{ position: 'relative' }}>
              {children}
            </Box>
          </ADialogMobile>
        )}
        {open && <ASimple key="Dialog-Mobile-Background" onClick={closeDialog} />}
      </PoseGroup>
    </Grommet>
  </Portal>
)

export default Mobile
