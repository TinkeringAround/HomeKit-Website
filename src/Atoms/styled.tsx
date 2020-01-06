import styled from 'styled-components'

// Types
import { TStyled } from '../Types'

// Styles
import { colors } from '../Styles'

// ===============================================
export const SInput = styled.input`
  width: 100%;
  height: 50px;
  margin: 2rem 0;
  padding: 0px;

  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: ${(props: TStyled) => (props.fontSize ? props.fontSize : '3rem')};
  text-overflow: ellipsis;

  border: none;
  color: ${colors['dark']};
  background-color: transparent;

  ::placeholder {
    color: ${colors['light']};
  }

  :focus {
    outline: none;
  }
`

// ===============================================
export const SNameInput = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: ${(props: TStyled) => (props.fontSize ? props.fontSize : '1.5em')};
  font-weight: bold;
  border: none;
  width: 50%;
  padding: 0px;
  color: ${colors['medium']};
  background-color: transparent;
  text-overflow: ellipsis;

  ::placeholder {
    color: ${colors['medium']};
  }

  :focus {
    outline: none;
  }
`

// ===============================================
export const SColumn = styled.div<TStyled>`
  width: 100%;
  height: auto;
  overflow-y: auto;

  margin: ${({ margin }) => (margin ? margin : '0')};
`

// ===============================================
export const SRow = styled.div`
  height: 60px;
  margin: ${(props: TStyled) => (props.margin ? props.margin : '20px 0px')};
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${props => (props.active ? colors['yellow'] : colors['light'])};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
