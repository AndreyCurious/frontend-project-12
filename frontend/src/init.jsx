import React from 'react';
import i18next from 'i18next';
import { Provider as RollbarProv, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { ApiContext } from './contexts';
import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channels.jsx';
import { addMessage } from './slices/messages';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const RollbarProvider = ({ children }) => (
  <RollbarProv config={rollbarConfig}>
    <ErrorBoundary>
      { children }
    </ErrorBoundary>
  </RollbarProv>
);
const init = async (socket) => {
  const api = {
    newMessage: (...args) => socket.emit('newMessage', ...args, (response) => {
      if (response.status !== 'ok') {
        console.error();
      }
    }),
    newChannel: (...args) => new Promise((resolve, reject) => {
      socket.emit('newChannel', ...args, (response) => {
        if (response.status !== 'ok') {
          reject();
        }
        resolve(response.data);
      });
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

  socket.on('newMessage', (response) => {
    store.dispatch(addMessage({
      message: response,
    }));
  });

  socket.on('newChannel', (response) => {
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
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      resources,
    });

  return (
    <RollbarProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ApiContext.Provider value={api}>
            <App />
          </ApiContext.Provider>
        </I18nextProvider>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
