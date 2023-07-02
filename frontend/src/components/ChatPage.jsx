/* eslint-disable*/
import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks';

const ChatPage = () => {
  const auth = useAuth();
  
  useEffect(() => {
    const getData = async () => {
      try {
        console.log(auth.getAuthData())
        const res = await axios.get('api/v1/data', auth.getAuthData())
        console.log(res)
      } catch(e) {
        console.log(e)
      }
    }
    getData()
  });

  
  return (
    <div></div>
  )
};

export default ChatPage;