import React from 'react';
import i18next from 'i18next';
import { Provider as RollbarProv, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index.js';

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

const init = async () => {
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
          <App />
        </I18nextProvider>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
