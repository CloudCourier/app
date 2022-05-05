import { createSlice } from '@reduxjs/toolkit'

export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    userList: [],
    selectedUserKey: null,
  },
  reducers: {
    setUserList: (state, { payload }) => {
      state.userList.push(payload)
    },
    setSelectedUserKey: (state, { payload }) => {
      state.selectedUserKey = payload
    },
    setMessageList: (state, { payload }) => {
      const user = state.userList.find((item) => item.key === payload.source)
      if (!user) return
      user.message.push(payload)
    },
   
  },
})

export default userListSlice.reducer
export const {
  setUserList,
  setSelectedUserKey,
  setMessageList,
} = userListSlice.actions
