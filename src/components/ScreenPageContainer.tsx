import { cn } from '@/lib/utils/cn'
import { ReactNode } from 'react'
import { View } from 'react-native'

export type ScreenPageContainerProps = {
  children: ReactNode
  className?: string
}

const ScreenPageContainer = ({
  children,
  className,
}: ScreenPageContainerProps) => {
  return (
    <View
      className={cn('flex-1 bg-[#021123] py-10 px-4 min-h-screen', className)}>
      {children}
    </View>
  )
}

export default ScreenPageContainer
