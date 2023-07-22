import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */
const initialState = {
  channels: [],
  currentChannelId: null,
};

const deafultId = 1;

const channelsSlice = createSlice({
  name: 'channelsData',
  initialState,
  reducers: {
    setStateChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels; 
      state.currentChannelId = currentChannelId;
    },
    setCurrenChannelId: (state, { payload }) => {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    addChannel: (state, { payload }) => {
      const { channel } = payload;
      state.channels.push(channel);
    },
    removeChannel: (state, { payload }) => {
      const { channelId } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== channelId);
      if (state.currentChannelId === channelId) {
        state.currentChannelId = deafultId;
      }
    },
    renameChannel: (state, { payload }) => {
      const { channelId, channelName } = payload;
      const channel = state.channels.find(({ id }) => id === channelId);
      channel.name = channelName;
    },
  },
})

export const { setStateChannels, setCurrenChannelId, addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;