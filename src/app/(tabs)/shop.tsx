import ScreenPageContainer from '@/components/ScreenPageContainer'
import { STORE_DATA } from '@/constants/store'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Shop = () => {
  return (
    <ScreenPageContainer className='py-20'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex-1 px-4 py-6'>
        {STORE_DATA.map((section) => (
          <View
            key={section.category}
            className='mb-8'>
            <Text className='text-white text-xl font-semibold mb-4'>
              {section.category}
            </Text>

            <View className='flex-row flex-wrap justify-between'>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className='w-[30%] rounded-xl p-3 mb-4 items-center'
                  activeOpacity={0.7}>
                  <Image
                    source={item.image}
                    className='w-[100px] h-[150px] mb-2 rounded-xl'
                  />

                  <Text className='text-white text-xs text-center leading-tight'>
                    {item.name}
                  </Text>

                  <Text className='text-white text-[10px] opacity-70 mt-1'>
                    {item.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenPageContainer>
  )
}

export default Shop
