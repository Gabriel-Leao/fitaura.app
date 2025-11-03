import { ROUTES } from '@/constants/routes'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Tabs } from 'expo-router'

import '../../global.css'

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#021123', borderColor: 'transparent' },
        tabBarActiveTintColor: '#B872FF',
        tabBarInactiveTintColor: '#FFFFFF',
      }}>
      <Tabs.Screen
        name={ROUTES.HOME.NAME}
        options={{
          title: ROUTES.HOME.LABEL,
          tabBarIcon: () => (
            <FontAwesome5
              name={ROUTES.HOME.ICON}
              size={24}
              color='white'
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.WORKOUT.NAME}
        options={{
          title: ROUTES.WORKOUT.LABEL,
          tabBarIcon: () => (
            <FontAwesome5
              name={ROUTES.WORKOUT.ICON}
              size={24}
              color='white'
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.SHOP.NAME}
        options={{
          title: ROUTES.SHOP.LABEL,
          tabBarIcon: () => (
            <FontAwesome5
              name={ROUTES.SHOP.ICON}
              size={24}
              color='white'
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.PROFILE.NAME}
        options={{
          title: ROUTES.PROFILE.LABEL,
          tabBarIcon: () => (
            <FontAwesome5
              name={ROUTES.PROFILE.ICON}
              size={24}
              color='white'
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.SIGN_IN.NAME}
        options={{
          title: ROUTES.SIGN_IN.LABEL,
          href: null,
        }}
      />

      <Tabs.Screen
        name={ROUTES.SIGN_UP.NAME}
        options={{
          title: ROUTES.SIGN_UP.LABEL,
          href: null,
        }}
      />
    </Tabs>
  )
}
