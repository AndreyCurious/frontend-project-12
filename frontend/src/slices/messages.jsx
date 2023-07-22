import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels';
/* eslint-disable */

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesData',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const { channelId } = payload;
      state.messages = state.messages.filter((message) => message.currentChannelId !== channelId);
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
