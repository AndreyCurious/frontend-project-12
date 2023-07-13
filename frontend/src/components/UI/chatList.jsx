import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrenChannelId } from '../../slices/channels';

const ChatList = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsData.channels);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  console.log(channels);

  return (
    <ul className="p-2 pb-0 mb-0 overflow-auto">
      {channels.map((channel) => (
        <li className="list-group-item" key={channel.id}>
          <button type="button" onClick={() => dispatch(setCurrenChannelId({ channelId: channel.id }))} className={channel.id === currentChannelId ? 'btn w-100 text-start rounded-0 btn-secondary' : 'btn w-100 text-start rounded-0'}>
            {`# ${channel.name}`}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
