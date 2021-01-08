import styled, { css } from 'styled-components/native'
import FeatherIcon from '@expo/vector-icons/build/Feather'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;

  background: #232129;

  flex-direction: row;
  align-items: center;

  border-color: ${props => (props.isFocused ? '#ff9000' : '#232129')};

  border-color: #232129;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab_400Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
