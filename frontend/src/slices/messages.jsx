import { createSlice } from '@reduxjs/toolkit';

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
  extraReducers: {

  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
