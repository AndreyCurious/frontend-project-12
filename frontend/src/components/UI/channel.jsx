import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrenChannelId } from '../../slices/channels';

const Channel = ({ channel, currentChannelId }) => {
  const dispatch = useDispatch();
  return (
    <li className="list-group-item" key={channel.id}>
      {channel.removable
        ? (
          <div class="btn-group">
            <button type="button" class="btn btn-danger">Action</button>
            <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
          )
        : ( <button type="button" onClick={() => dispatch(setCurrenChannelId({ channelId: channel.id }))} className={channel.id === currentChannelId ? 'btn w-100 text-start rounded-0 btn-secondary' : 'btn w-100 text-start rounded-0'}>
            {`# ${channel.name}`}
            </button>
          )
      }
    </li>
  )
};

export default Channel;