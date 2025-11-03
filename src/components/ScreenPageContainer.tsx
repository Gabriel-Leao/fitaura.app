import { ReactNode } from 'react'
import { View } from 'react-native'

export type ScreenPageContainerProps = {
  children: ReactNode
}

const ScreenPageContainer = ({ children }: ScreenPageContainerProps) => {
  return <View className='flex-1 bg-[#021123] py-10 px-4'>{children}</View>
}

export default ScreenPageContainer
