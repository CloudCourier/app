import React, { useState } from 'react'
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
  useColorModeValue,
  IconButton,
  Icon,
  Pressable,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Box,
} from 'native-base'
import { Entypo } from '@expo/vector-icons'
import IconGoogle from './components/IconGoogle'
import IconFacebook from './components/IconFacebook'
import FloatingLabelInput from './components/FloatingLabelInput'
import { Toast } from 'native-base'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { login as LoginAPI } from '../../api/user'
import { useAppDispatch } from '../../hooks/store'
import { setUser } from '../../store/auth.slice'

export function SignInForm({ props }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const dispatch = useAppDispatch()
  const loginSubmit = () => {
    setIsloading(true)
    setTimeout(() => {
      LoginAPI({ login, password })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUser(res.data))
            Toast.show({
              title: '欢迎回来',
            })
            props.navigation.navigate('Root')
            return
          }
          Toast.show({
            title: '登陆失败',
          })
          setIsloading(false)
        })
        .catch(() => {
          // TODO 考虑到组件卸载，卸载后不能在更新状态
          setIsloading(false)
        })
    }, 2000)
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
    >
      <VStack
        flex='1'
        px='6'
        py='9'
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        space='3'
        justifyContent='space-between'
        borderTopRightRadius={{ base: '2xl', md: 'xl' }}
        borderBottomRightRadius={{ base: '0', md: 'xl' }}
        borderTopLeftRadius={{ base: '2xl', md: '0' }}
        isDisabled={isloading}
      >
        <VStack space='7'>
          <Hidden till='md'>
            <Text fontSize='lg' fontWeight='normal'>
              Sign in to continue!
            </Text>
          </Hidden>
          <VStack>
            <VStack space='3'>
              <VStack space={{ base: '7', md: '4' }}>
                <FloatingLabelInput
                  isRequired
                  label='Email'
                  labelColor='#9ca3af'
                  labelBGColor={useColorModeValue('#fff', '#1f2937')}
                  borderRadius='4'
                  defaultValue={login}
                  onChangeText={(txt: any) => setLogin(txt)}
                  _text={{
                    fontSize: 'sm',
                    fontWeight: 'medium',
                  }}
                  _dark={{
                    borderColor: 'coolGray.700',
                  }}
                  _light={{
                    borderColor: 'coolGray.300',
                  }}
                />
                <FloatingLabelInput
                  isRequired
                  type={showPass ? '' : 'password'}
                  label='Password'
                  borderRadius='4'
                  labelColor='#9ca3af'
                  labelBGColor={useColorModeValue('#fff', '#1f2937')}
                  defaultValue={password}
                  onChangeText={(txt: any) => setPassword(txt)}
                  InputRightElement={
                    <IconButton
                      variant='unstyled'
                      icon={
                        <Icon
                          size='4'
                          color='coolGray.400'
                          as={Entypo}
                          name={showPass ? 'eye-with-line' : 'eye'}
                        />
                      }
                      onPress={() => {
                        setShowPass(true)
                      }}
                    />
                  }
                  _text={{
                    fontSize: 'sm',
                    fontWeight: 'medium',
                  }}
                  _dark={{
                    borderColor: 'coolGray.700',
                  }}
                  _light={{
                    borderColor: 'coolGray.300',
                  }}
                />
              </VStack>
              <Link
                ml='auto'
                _text={{
                  fontSize: 'xs',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
                _light={{
                  _text: {
                    color: 'primary.900',
                  },
                }}
                _dark={{
                  _text: {
                    color: 'primary.500',
                  },
                }}
              >
                Forgot password?
              </Link>
              <Checkbox
                alignItems='flex-start'
                mt='5'
                isChecked
                value='demo'
                colorScheme='primary'
                accessibilityLabel='Remember me'
              >
                <Text
                  pl='3'
                  fontWeight='normal'
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.400' }}
                >
                  Remember me and keep me logged in
                </Text>
              </Checkbox>
              <Button
                mt='5'
                size='md'
                borderRadius='4'
                _text={{
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}
                onPress={loginSubmit}
                isLoading={isloading}
              >
                SIGN IN
              </Button>
              <HStack
                mt='5'
                space='2'
                mb={{ base: 6, md: 7 }}
                alignItems='center'
                justifyContent='center'
              >
                <Divider
                  w='30%'
                  _light={{ bg: 'coolGray.200' }}
                  _dark={{ bg: 'coolGray.700' }}
                ></Divider>
                <Text
                  fontWeight='medium'
                  _light={{ color: 'coolGray.300' }}
                  _dark={{ color: 'coolGray.500' }}
                >
                  or
                </Text>
                <Divider
                  w='30%'
                  _light={{ bg: 'coolGray.200' }}
                  _dark={{ bg: 'coolGray.700' }}
                ></Divider>
              </HStack>
            </VStack>
            <Center>
              <HStack space='4'>
                <Pressable>
                  <IconFacebook />
                </Pressable>
                <Pressable>
                  <IconGoogle />
                </Pressable>
              </HStack>
            </Center>
          </VStack>
        </VStack>
        <HStack
          mb='4'
          space='1'
          safeAreaBottom
          alignItems='center'
          justifyContent='center'
          mt={{ base: 'auto', md: '8' }}
        >
          <Text
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.400' }}
          >
            Don't have an account?
          </Text>
          <Link
            _text={{
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
            _dark={{
              _text: {
                color: 'primary.500',
              },
            }}
            onPress={() => {
              props.navigation.navigate('SignUp')
            }}
          >
            Sign up
          </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}
export default function SignIn(props: any) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content'
      />
      <Box
        safeAreaTop
        _light={{ bg: 'primary.900' }}
        _dark={{ bg: 'coolGray.900' }}
      />
      <Center
        my='auto'
        _dark={{ bg: 'coolGray.900' }}
        _light={{ bg: 'primary.900' }}
        flex='1'
      >
        <Stack
          flexDirection={{ base: 'column', md: 'row' }}
          w='100%'
          maxW={{ md: '1016px' }}
          flex={{ base: '1', md: 'none' }}
        >
          <Hidden from='md'>
            <VStack px='4' mt='4' mb='5' space='9'>
              <VStack space='2'>
                <Text fontSize='3xl' fontWeight='bold' color='coolGray.50'>
                  Welcome back
                </Text>
                <Text
                  fontSize='md'
                  fontWeight='normal'
                  _dark={{
                    color: 'coolGray.400',
                  }}
                  _light={{
                    color: 'primary.300',
                  }}
                >
                  Sign in to continue
                </Text>
              </VStack>
            </VStack>
          </Hidden>
          <SignInForm props={props} />
        </Stack>
      </Center>
    </>
  )
}
