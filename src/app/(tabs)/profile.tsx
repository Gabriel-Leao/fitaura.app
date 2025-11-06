import { useUserContext } from '@/components/context/useUserContext'
import ScreenPageContainer from '@/components/ScreenPageContainer'
import { ROUTES } from '@/constants/routes'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const { currentUser: user, logout, deleteUser } = useUserContext()

  if (!user) return null

  const onLogoutPressed = async () => {
    await logout()
    router.push(ROUTES.SIGN_IN.ROUTE)
  }

  const onDeletePressed = async () => {
    try {
      await deleteUser(user.id)
      router.push(ROUTES.SIGN_IN.ROUTE)
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <ScreenPageContainer className='flex justify-center'>
      <View>
        <View className='items-center mt-10'>
          <FontAwesome5
            name='user-alt'
            size={128}
            color='white'
          />

          <Text className='text-white text-xl font-semibold mt-2'>
            {user.name}
          </Text>
        </View>

        <View className='pt-10 px-6 gap-5'>
          <Text className='text-white text-xl font-bold'>
            Email: {user.email}
          </Text>

          <Text className='text-white text-xl font-bold'>
            Idade: {user.age} anos
          </Text>
          <Text className='text-white text-xl font-bold'>
            Altura: {user.height ? user.height + ' cm' : 'Não informado'}
          </Text>
          <Text className='text-white text-xl font-bold'>Sexo: {user.sex}</Text>
          <Text className='text-white text-xl font-bold'>
            Objetivo: {user.goal ?? 'Não informado'}
          </Text>
        </View>

        <View className='py-8 gap-4 px-4'>
          <TouchableOpacity
            onPress={onLogoutPressed}
            className='bg-[#98A0A8] rounded-xl py-3 flex-row items-center justify-center gap-2'>
            <FontAwesome5
              name='sign-out-alt'
              size={24}
              color='white'
            />
            <Text className='text-white font-semibold text-lg'>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDeletePressed}
            className='bg-red-600 rounded-xl py-3 flex-row items-center justify-center gap-2'>
            <FontAwesome5
              name='trash-alt'
              size={24}
              color='white'
            />
            <Text className='text-white font-semibold text-lg'>
              Apagar conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenPageContainer>
  )
}

export default Profile
