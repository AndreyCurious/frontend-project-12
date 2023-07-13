import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { addMessage } from '../slices/messages';
import { addChannel, removeChannel, renameChannel } from '../slices/channels.jsx';

const socket = io();

socket.on('newMessage', (response) => {
  store.dispatch(addMessage({
    message: response,
  }));
});

socket.on('addChannel', (response) => {
  store.dispatch(addChannel({
    channel: response,
  }));
});

socket.on('removeChannel', (response) => {
  store.dispatch(removeChannel({
    channelId: response.id,
  }));
});

socket.on('renameChannel', (response) => {
  store.dispatch(renameChannel({
    channelId: response.id,
    channelName: response.name,
  }));
});

const createApi = () => {
  const api = {
    newMessage: (...args) => socket.emit('newMessage', ...args, (response) => {
      if (response.status !== 'ok') {
        console.error();
      }
    }),
    newChannel: (...args) => socket.emit('newChannel', ...args, (response) => {
      if (response.status !== 'ok') {
        console.error();
      }
    }),
    removeChannel: (...args) => socket.emit('removeChannel', ...args, (response) => {
      if (response.status !== 'ok') {
        console.error();
      }
    }),
    renameChannel: (...args) => socket.emit('renameChannel', ...args, (response) => {
      if (response.status !== 'ok') {
        console.error();
      }
    }),
  };
  return api;
};

const api = createApi();

export default (func, ...args) => api[func](...args);
