import styled from 'styled-components'

// Types
import { TStyled } from '../Types/'

// Theme
import { theme } from '../theme'

// Components
export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: ${(props: TStyled) => (props.fontSize ? props.fontSize : '1.25em')};
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 0px;
  color: ${theme.global.colors.headingInactive};
  background-color: ${theme.global.colors.background};
  text-overflow: ellipsis;

  ::placeholder {
    color: ${theme.global.colors.iconWrapperInactive};
  }

  :focus {
    outline: none;
  }
`

export const NameInput = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: ${(props: TStyled) => (props.fontSize ? props.fontSize : '1.5em')};
  font-weight: bold;
  border: none;
  width: 65%;
  padding: 0px;
  color: ${theme.global.colors.iconInactive};
  background-color: ${theme.global.colors.deviceInactive};
  text-overflow: ellipsis;

  ::placeholder {
    color: ${theme.global.colors.iconInactive};
  }

  :focus {
    outline: none;
  }
`

export const Column = styled.div`
  width: 100%;
  height: auto;
  overflow-y: auto;
`

export const Container = styled.div`
  height: 60px;
  margin: ${(props: TStyled) => (props.margin ? props.margin : '20px 0px')};
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${props =>
    props.active ? theme.global.colors.deviceActive : theme.global.colors.deviceInactive};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
