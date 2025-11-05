import { useUserContext } from '@/components/context/useUserContext'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import FormWrapper from '@/components/FormWrapper'
import ScreenPageContainer from '@/components/ScreenPageContainer'
import ScreenPageTitle from '@/components/ScreenPageTitle'
import { ROUTES } from '@/constants/routes'
import { Link } from 'expo-router'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const { login } = useUserContext()

  const onSignInPressed = async (data: SignInFormData) => {
    try {
      await login(data.email, data.password)
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <ScreenPageContainer className='gap-8 justify-center'>
      <ScreenPageTitle>Login</ScreenPageTitle>
      <FormWrapper>
        <View className='gap-3 items-center'>
          <CustomInput
            name='email'
            placeholder='E-mail'
            control={control}
            keyboardType='email-address'
            rules={{
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'E-mail inválido',
              },
            }}
          />

          <CustomInput
            name='password'
            placeholder='Senha'
            control={control}
            secureTextEntry={true}
            rules={{
              required: 'Senha é obrigatória',
              minLength: {
                value: 8,
                message: 'A senha deve ter no mínimo 8 caracteres',
              },
            }}
          />

          <CustomButton
            onPress={handleSubmit(onSignInPressed)}
            label='Entrar'
            disabled={!isValid}
          />
        </View>
      </FormWrapper>
      <Link
        href={ROUTES.SIGN_UP.ROUTE}
        className='text-[#fff] text-center pt-12'>
        Não tem conta? cadastra-se
      </Link>
    </ScreenPageContainer>
  )
}

export default SignIn
