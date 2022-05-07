import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'
import { ColorSchemeName, Pressable } from 'react-native'
import { NativeBaseProvider, extendTheme, theme as nbTheme } from 'native-base'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import SearchScreen from '../screens/SearchScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import MessageScreen from '../screens/MessageScreen'
import UserScreen from '../screens/UserScreen'
import SignIn from '../screens/SignIn/index'
import SignUp from '../screens/SignUp/index'
import ChatScreen from '../screens/ChatScreen'
import OTP from '../screens/OTP/index'
import { setMessageList, setUserList } from '../store/userList.slice'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import useCourier from '../hooks/useCourier'

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.violet,
  },
})

// 路由总封装
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const dispatch = useAppDispatch()
  const userList = useAppSelector((state) => state.userList.userList)
  const messageChannel = useAppSelector(
    (state) => state.messageChannel.messageChannel
  )
  const messageTimestamp = useAppSelector(
    (state) => state.messageChannel.messageTimestamp
  )
  const { connect, user, courierKey, message, sendMessage } = useCourier()
  useEffect(() => {
    if (user !== null && !userList.some((item) => item.key === user.key)) {
      user.message = []
      dispatch(setUserList(user))
    }
  }, [courierKey])
  useEffect(() => {
    connect()
    console.log('connect',connect)
  }, [])
  useEffect(() => {
    if (messageChannel && messageChannel.type === 'sendMessage') {
      console.log(messageChannel)
      sendMessage(messageChannel.message.key, messageChannel.message.message)
    }
    // FIXME 多写个时间点 多余的消耗
  }, [messageTimestamp])
  useEffect(() => {
    dispatch(setMessageList(message))
  }, [message.timestamp])
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
const Stack = createNativeStackNavigator<RootStackParamList>()

// 路由注册
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group>
        <Stack.Screen name='Search' component={SearchScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='SignIn' component={SignIn} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='OTP' component={OTP} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

// 底部导航栏
function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='TabOne'
        component={MessageScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: '消息',
          tabBarIcon: ({ color }) => (
            <Feather name='message-circle' size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Search')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <AntDesign
                name='search1'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={UserScreen}
        options={{
          title: '个人中心',
          tabBarIcon: ({ color }) => (
            <AntDesign name='user' size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
