import styled from 'styled-components/native';
import FeatherIcon from '@expo/vector-icons/build/Feather'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;

  background: #232129;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab_400Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`