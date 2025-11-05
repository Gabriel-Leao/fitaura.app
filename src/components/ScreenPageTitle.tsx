import { cn } from '@/lib/utils/cn'
import { Text } from 'react-native'
import { ScreenPageContainerProps } from './ScreenPageContainer'

const ScreenPageTitle = ({ children, className }: ScreenPageContainerProps) => {
  return (
    <Text
      className={cn('text-xl font-bold text-[#fff] text-center', className)}>
      {children}
    </Text>
  )
}

export default ScreenPageTitle
