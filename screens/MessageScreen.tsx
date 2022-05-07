import React from 'react'
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  NativeBaseProvider,
} from 'native-base'
import dayjs from 'dayjs'
import { StyleSheet } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { setSelectedUserKey } from '../store/userList.slice'
const ChatList = ({ navigation }) => {
  const userList = useAppSelector((state) => state.userList.userList)
  const dispatch = useAppDispatch()
  return (
    <Box>
      <FlatList
        data={userList}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth='1'
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor='muted.800'
            pl='4'
            pr='5'
            py='2'
          >
            <HStack space={3} justifyContent='space-between'>
              <Avatar
                size='48px'
                source={{
                  uri: item.appLogo,
                }}
              />
              <VStack style={styles.textContainer}>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  numberOfLines={1}
                  color='coolGray.800'
                  bold
                  onPress={() => {
                    navigation.navigate('Chat')
                    dispatch(setSelectedUserKey(item.key))
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  color='coolGray.600'
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize='xs'
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                alignSelf='flex-start'
              >
                {dayjs(item.timestamp).format('HH:mm:ss')}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.key}
      />
    </Box>
  )
}

export default ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <ChatList navigation={navigation} />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: '60%',
  },
})
