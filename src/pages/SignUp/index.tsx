import React, { useRef, useCallback } from 'react'
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
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles'
import logoImg from '../../../assets/logo.png'

interface SignUpFormData {
  email: string
  name: string
  password: string
}

const SignUp: React.FC = () => {
  const navigation = useNavigation()

  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        password: Yup.string().min(8, 'A senha deve ter pelo menos 8 digitos'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      // await api.post('/users', data)

      // history.push('/')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro no cadastro, por favor tente novamente.',
        )
      }
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
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Password"
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
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
