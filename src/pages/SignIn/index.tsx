import React, { useCallback, useRef } from 'react'
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/build/Feather'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles'
import logoImg from '../../../assets/logo.png'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      // await auth.signIn({
      //   email: data.email,
      //   password: data.password
      // })

      // history.push('/dashboard')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao tentar seu login. Cheque suas credenciais.',
      )
    }
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
              <Title>Faça seu logon</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignIn}
              style={{ width: '100%' }}
            >
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                ref={passwordInputRef}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('forgot-password')
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton
        onPress={() => {
          navigation.navigate('SignUp')
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />

        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn
