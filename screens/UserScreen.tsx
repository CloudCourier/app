import { useState } from 'react'
import { Avatar, Center, VStack, Button } from 'native-base'
import { Text, View } from '../components/Themed'
import { useAppSelector } from '../hooks/store'

export default function UserScreen({ navigation }) {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <View>
      <Center>
        <VStack
          space={2}
          alignItems={{
            base: 'center',
            md: 'flex-start',
          }}
        >
          {user === null ? (
            <Button onPress={() => navigation.navigate('SignIn')}>
              去登录
            </Button>
          ) : (
            <>
              <Avatar
                alignSelf='center'
                bg='amber.500'
                size='lg'
                source={{
                  uri: user.avatar,
                }}
              >
                AK
              </Avatar>
              <Text>{user.username}</Text>
            </>
          )}
        </VStack>
      </Center>
    </View>
  )
}
