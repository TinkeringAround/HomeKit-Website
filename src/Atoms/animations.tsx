import styled from 'styled-components'
import posed from 'react-pose'

// Styles
import { theme } from '../Styles'

// Utility
import { hexToRGBA } from '../Utility'

// ===============================================
const SBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 700;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.7);
`

export const ASimple = posed(SBackground)({
  exit: { opacity: 0 },
  enter: { opacity: 1 }
})

// ===============================================
const SDialogMobile = styled.div`
  position: absolute;
  z-index: 701;

  width: 100%;
  height: 90%;

  background: ${hexToRGBA(theme.global.colors['background'], '1')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ADialogMobile = posed(SDialogMobile)({
  exit: {
    opacity: 0,
    bottom: '-15%'
  },
  enter: {
    opacity: 1,
    bottom: '0%'
  }
})

export const SDialogDesktop = styled.div`
  position: absolute;
  z-index: 701;

  border-radius: 10px;
  background: ${hexToRGBA(theme.global.colors['background'], '1')};

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ADialogDesktop = posed(SDialogDesktop)({
  exit: {
    opacity: 0,
    top: '5%'
  },
  enter: {
    opacity: 1,
    top: '10%'
  }
})
