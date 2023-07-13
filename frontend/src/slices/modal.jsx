/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  typeOfForm: null,
  channelId: null,
};

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    openWindow(state, { payload }) {
      const { typeOfForm, channelId } = payload;
      state.isOpen = true;
      state.typeOfForm = typeOfForm;
      channelId ? state.channelId = channelId : null;
    },
    closeWindow(state) {
      state.isOpen = false;
      state.typeOfForm = null;
      state.channelId = null;
    }
  },
})

export const { openWindow, closeWindow } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;