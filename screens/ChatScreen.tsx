import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { setMessageChannel } from '../store/messageChannel.slice'
export default function ChatScreen() {
  const [messages, setMessages] = useState([])
  const userList = useAppSelector((state) => state.userList.userList)
  const dispatch = useAppDispatch()
  const selectedUserKey = useAppSelector(
    (state) => state.userList.selectedUserKey
  )
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  useEffect(() => {
    const selected = userList.find((user) => user.key === selectedUserKey)
    let messageList = selected?.message || []
    const name = selected?.name || ''
    const appLogo = selected?.appLogo || ''
    messageList = messageList.map((message) => ({
      _id: message.timestamp,
      text: message.content,
      createdAt: new Date(),
      user: {
        _id: message.target,
        name,
        avatar: appLogo,
      },
    }))
    setMessages(messageList)
  }, [userList, selectedUserKey])
  const broadcastChannel = new BroadcastChannel('channel')
  const onSend = useCallback((messages = []) => {
    // TODO 这里需要改造，应当从hooks里面去拿方法，而不是广播
    dispatch(
      setMessageChannel({
        type: 'sendMessage',
        message: {
          key: messages[0].user._id,
          message: messages[0].text,
        }
      })
    )

    // TODO 这里先不写自己发的到列表，因为要考虑到消息同步问题
  }, [])

  return (
    <GiftedChat
      inverted={false}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: selectedUserKey,
      }}
    />
  )
}
