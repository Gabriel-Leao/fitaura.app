import { cn } from '@/lib/utils/cn'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native'

type CustomInputProps<T extends FieldValues> = {
  placeholder: string
  secureTextEntry?: boolean
  control: Control<T>
  name: Path<T>
  keyboardType?: KeyboardTypeOptions
  rules?: object
}

const CustomInput = <T extends FieldValues>({
  placeholder,
  secureTextEntry,
  control,
  name,
  keyboardType = 'default',
  rules = {},
}: CustomInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View className={'w-4/5 rounded-xl gap-2'}>
          <TextInput
            placeholder={placeholder}
            autoComplete='off'
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry ?? false}
            className={cn(
              'bg-[#fff] rounded-xl border-2 text-[#144480] px-6 py-3',
              error ? 'border-red-600' : 'border-transparent'
            )}
          />
          <Text
            className={cn(
              'text-red-600 self-stretch px-2 min-h-[16px]',
              !error && 'opacity-0'
            )}>
            {error?.message || 'Erro'}
          </Text>
        </View>
      )}
    />
  )
}

export default CustomInput
