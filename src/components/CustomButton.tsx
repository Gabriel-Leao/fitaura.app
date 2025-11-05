import { Text, TouchableOpacity } from 'react-native'

type CustomButtonProps = {
  onPress: () => void
  label: string
  disabled?: boolean
}

const CustomButton = ({
  onPress,
  label,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className='bg-[#B872FF] px-6 py-3 rounded-xl w-4/5 disabled:bg-[#B872FF60]'
      onPress={onPress}
      disabled={disabled}>
      <Text className='text-[#fff] text-center font-bold disabled:text-[#98A0A8]'>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
