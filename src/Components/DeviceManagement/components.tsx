import styled from 'styled-components'

// Theme
import { theme } from '../../theme'

// Components
export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 2vw;
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 0px;
  color: ${theme.global.colors.headingInactive};
  background-color: ${theme.global.colors.background};

  ::placeholder {
    color: ${theme.global.colors.iconWrapperInactive};
  }

  :focus {
    outline: none;
  }
`

export const Container = styled.div`
  height: 60px;
  margin: 20px 0px;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: ${theme.global.colors.deviceInactive};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
