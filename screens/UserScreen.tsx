import { Avatar, Center, VStack, Button } from 'native-base'
import { Text, View } from '../components/Themed'
import { useAppSelector } from '../hooks/store'

export default function UserScreen({ navigation }) {
  const user = useAppSelector((state) => state.auth.user)
  const isHermes = () => !!global.HermesInternal
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
              <Button onPress={() => navigation.navigate('SignIn')}>
                切换账号
              </Button>
              <Text>{isHermes ? "我存在" : "不存在"}</Text>
            </>
          )}
        </VStack>
      </Center>
    </View>
  )
}
