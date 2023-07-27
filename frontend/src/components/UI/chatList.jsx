import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './channel';

const ChatList = () => {
  const channels = useSelector((state) => state.channelsData.channels);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);

  return (
    <ul className="p-2 pb-0 mb-0 overflow-auto">
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} currentChannelId={currentChannelId} />
      ))}
    </ul>
  );
};

export default ChatList;
