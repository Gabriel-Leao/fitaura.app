import { useUserContext } from '@/components/context/useUserContext'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import CustomPicker from '@/components/CustomPicker'
import FormWrapper from '@/components/FormWrapper'
import ScreenPageContainer from '@/components/ScreenPageContainer'
import ScreenPageTitle from '@/components/ScreenPageTitle'
import { ROUTES } from '@/constants/routes'
import { Link, router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

type SignUpFormData = {
  name: string
  email: string
  age: number
  height: string
  goal: 'Perder peso' | 'Ganhar peso' | 'Manter peso'
  sex: 'Masculino' | 'Feminino'
  password: string
}

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const { register } = useUserContext()

  const onCreatePressed = async (data: SignUpFormData) => {
    try {
      await register(data)
      router.push(ROUTES.HOME.ROUTE)
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <ScreenPageContainer className='gap-8 pt-24'>
      <ScreenPageTitle>Criar conta</ScreenPageTitle>
      <FormWrapper>
        <View className='gap-3 items-center'>
          <CustomInput
            name='name'
            placeholder='Nome completo'
            control={control}
            rules={{
              required: 'Nome é obrigatório',
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/,
                message: 'Nome inválido',
              },
            }}
          />

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

          <View className='flex flex-row gap-8 justify-center'>
            <CustomInput
              name='age'
              placeholder='Idade'
              control={control}
              keyboardType='numeric'
              viewClassname='w-1/3'
              rules={{
                required: 'Idade é obrigatória',
                min: {
                  value: 18,
                  message: 'É necessário ter no mínimo 18 anos',
                },
                max: {
                  value: 120,
                  message: 'Idade muito alta, verifique',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'A idade deve conter apenas números inteiros',
                },
              }}
            />

            <CustomInput
              name='height'
              placeholder='Altura em cm'
              control={control}
              keyboardType='numeric'
              viewClassname='w-2/5'
              rules={{
                required: 'Altura é obrigatória',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Use apenas números (ex: 175)',
                },
                min: {
                  value: 120,
                  message: 'Altura mínima permitida é 120 cm',
                },
                max: {
                  value: 250,
                  message: 'Altura máxima permitida é 250 cm',
                },
              }}
            />
          </View>

          <View className='flex flex-row gap-8 justify-center'>
            <CustomPicker
              control={control}
              name='sex'
              placeholder='Sexo'
              viewClassname='w-[30%]'
              rules={{ required: 'Selecione seu sexo' }}
              options={[
                { label: 'Masculino', value: 'male' },
                { label: 'Feminino', value: 'female' },
              ]}
            />

            <CustomPicker
              control={control}
              name='goal'
              placeholder='Objetivo'
              rules={{ required: 'Selecione seu objetivo' }}
              options={[
                { label: 'Perder peso', value: 'lose' },
                { label: 'Ganhar peso', value: 'gain' },
                { label: 'Manter peso', value: 'maintain' },
              ]}
            />
          </View>

          <CustomButton
            onPress={handleSubmit(onCreatePressed)}
            disabled={!isValid}
            label='Criar conta'
          />
        </View>
      </FormWrapper>
      <Link
        href={ROUTES.SIGN_IN.ROUTE}
        className='text-[#fff] text-center pt-12'>
        Já tem conta? Faça login
      </Link>
    </ScreenPageContainer>
  )
}

export default SignUp
