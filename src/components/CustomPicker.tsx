import { cn } from '@/lib/utils/cn'
import { Picker } from '@react-native-picker/picker'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Text, View } from 'react-native'

type Option = {
  label: string
  value: string
}

type CustomPickerProps<T extends FieldValues> = {
  placeholder?: string
  control: Control<T>
  name: Path<T>
  rules?: object
  options: Option[]
  viewClassname?: string
  pickerClassname?: string
}

const CustomPicker = <T extends FieldValues>({
  placeholder = 'Selecione...',
  control,
  name,
  rules = {},
  options,
  viewClassname,
  pickerClassname,
}: CustomPickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className={cn('w-4/5 rounded-xl gap-2', viewClassname)}>
          <View
            className={cn(
              'bg-white rounded-xl border-2',
              error ? 'border-red-600' : 'border-transparent'
            )}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              className={cn('w-full h-full', pickerClassname)}>
              <Picker.Item
                label={placeholder}
                value=''
              />
              {options.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>

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

export default CustomPicker
