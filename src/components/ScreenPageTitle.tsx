import { Text } from 'react-native'
import { ScreenPageContainerProps } from './ScreenPageContainer'

const ScreenPageTitle = ({ children }: ScreenPageContainerProps) => {
  return <Text className='text-xl font-bold text-[#fff]'>{children}</Text>
}

export default ScreenPageTitle
