import CustomButton from '@/components/CustomButton'
import FormWrapper from '@/components/FormWrapper'
import ScreenPageContainer from '@/components/ScreenPageContainer'
import ScreenPageTitle from '@/components/ScreenPageTitle'
import { ROUTES } from '@/constants/routes'
import { Link, router } from 'expo-router'
import { TextInput, View } from 'react-native'

const SignUp = () => {
  const redirectToLogin = () => {
    router.push(ROUTES.SIGN_IN.ROUTE)
  }
  return (
    <ScreenPageContainer>
      <ScreenPageTitle>Criar conta</ScreenPageTitle>
      <FormWrapper>
        <View className='flex gap-10'>
          <View className='flex flex-row items-center gap-6'>
            <TextInput
              placeholder='Email: '
              className='bg-[#fff] rounded-lg w-[280px] text-[#144480] px-4 py-2'
              autoCorrect={false}
              autoComplete='off'
              keyboardType='email-address'
            />
          </View>

          <CustomButton
            onPress={redirectToLogin}
            label='Criar conta'
          />

          <Link
            href={ROUTES.SIGN_IN.ROUTE}
            className='text-[#fff]'>
            Já tem conta? Faça login
          </Link>
        </View>
      </FormWrapper>
    </ScreenPageContainer>
  )
}

export default SignUp
