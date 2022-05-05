import authReducer from './auth.slice'
import userListReducer from './userList.slice'
import messageChannelReducer from './messageChannel.slice'
import { combineReducers } from '@reduxjs/toolkit'
export default combineReducers({
  auth: authReducer,
  userList: userListReducer,
  messageChannel: messageChannelReducer,
})
