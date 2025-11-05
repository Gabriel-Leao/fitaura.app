import { UserProvider } from '@/components/context/UserProvider'
import { Slot } from 'expo-router'

import '../../global.css'

export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  )
}
