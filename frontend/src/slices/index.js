import { configureStore } from '@reduxjs/toolkit';
import channelsReduser from './channels';
import messagesReduser from './messages';
import modalReducer from './modal';

export default configureStore({
  reducer: {
    channelsData: channelsReduser,
    messagesData: messagesReduser,
    modalData: modalReducer,
  },
});
