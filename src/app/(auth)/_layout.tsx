import { useUserContext } from '@/components/context/useUserContext'
import { ROUTES } from '@/constants/routes'
import { router, Stack } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
  const { currentUser } = useUserContext()

  useEffect(() => {
    if (currentUser) {
      router.push(ROUTES.HOME.ROUTE)
    }
  }, [currentUser])

  return <Stack screenOptions={{ headerShown: false }} />
}
