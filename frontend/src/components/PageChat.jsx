import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setStateChannels } from '../slices/channels';
import { useAuth } from '../hooks';
import MessageForm from './UI/messageForm';
import ChatList from './UI/chatList';
import AddChannelButton from './UI/addChannelBtn';
import Modal from './UI/modal';

const Message = ({ name, msg }) => (
  <div className="text-break mb-2">
    <b>{name}</b>
    {': '}
    {msg}
  </div>
);

const PageChat = () => {
  const refChannels = useRef(null);
  const inputRefMsg = useRef(null);
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const msgs = useSelector((state) => state.messagesData.messages);
  const chnl = useSelector((state) => state.channelsData.channels);

  const messagesCurrentChat = useSelector((state) => {
    const { currentChannelId } = state.channelsData;
    const { messages } = state.messagesData;
    const result = messages
      .filter((message) => Number(message.currentChannelId) === Number(currentChannelId));
    return result;
  });

  const scrollToMyMsgRef = () => {
    inputRefMsg.current.scrollTo(0, inputRefMsg.current.scrollHeight);
  };
  const scrollToMyChnlRef = () => {
    refChannels.current.scrollTo(0, refChannels.current.scrollHeight);
  };
  useEffect(() => {
    scrollToMyMsgRef();
    scrollToMyChnlRef();
  }, [msgs, chnl]);

  useEffect(() => {
    /* eslint-disable */
    const getData = async () => {
      try {
        const res = await axios.get('api/v1/data', { headers: auth.getAuthData() });
        dispatch(setStateChannels(res.data));
      } catch (e) {
        if (e.response.status === 401 || e.response.status === 500 || e.isAxiosError) {
          return navigate('/login');
        }
        console.error(e);
      }
    };
    getData();
  }, [navigate, dispatch, auth]);
  
  /* eslint-enable */
  return (
    <>
      <Modal />
      <div className="container-fluid h-100 overflow-hidden my-4">
        <div className="row justify-content-center h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="row col-xxl-8 h-100 shadow bg-white border border-primary rounded d-flex p-0">
              <div className="col-4 border-end bg-light p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="p-3 ms-3 d-flex justify-content-between">
                    <b>{t('chatPage.channels')}</b>
                    <AddChannelButton />
                  </div>
                  <hr className="p-0 m-0" />
                  <div className="flex-column overflow-auto" ref={refChannels}>
                    <ChatList />
                  </div>
                </div>
              </div>
              <div className="col h-100">
                <div className="d-flex flex-column h-100">
                  <div className="overflow-auto px-5 mt-4" ref={inputRefMsg}>
                    {messagesCurrentChat.map(({ name, msg, id }) => (
                      <Message
                        key={id}
                        name={name}
                        msg={msg}
                      />
                    ))}
                  </div>
                  <div className="mt-auto px-5 py-3">
                    <MessageForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageChat;
