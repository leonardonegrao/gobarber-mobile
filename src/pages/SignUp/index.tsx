import React, { useRef, useCallback } from 'react'
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/build/Feather'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles'
import logoImg from '../../../assets/logo.png'

const SignUp: React.FC = () => {
  const navigation = useNavigation()

  const formRef = useRef<FormHandles>(null)

  const handleSignUp = useCallback((data: Record<string, unknown>) => {
    console.log(data)
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Password" />

              <Button onPress={formRef.current?.submitForm}>Entrar</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />

        <BackToSignInButtonText>Já tenho uma conta</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  )
}

export default SignUp
