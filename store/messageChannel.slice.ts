import { createSlice } from '@reduxjs/toolkit'

export const messageChannelSlice = createSlice({
  name: 'messageChannel',
  initialState: {
    messageChannel: null,
    messageTimestamp:0
  },
  reducers: {
    setMessageChannel: (state, { payload }) => {
      state.messageChannel = payload
      state.messageTimestamp = new Date().getTime()
    },
  },
})

export default messageChannelSlice.reducer
export const {
  setMessageChannel,
} = messageChannelSlice.actions
