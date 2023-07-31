import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrenChannelId } from '../../slices/channels';
import { openWindow } from '../../slices/modal';

const Channel = ({ channel, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <li className="list-group-item" key={channel.id}>
      {channel.removable
        ? (
          <Dropdown className="w-100" as={ButtonGroup}>
            <Button
              className={channel.id === currentChannelId ? 'btn w-100 text-start rounded-0 btn-secondary text-truncate' : 'btn w-100 text-start rounded-0 text-truncate'}
              key={channel.id}
              variant={null}
              onClick={() => dispatch(setCurrenChannelId({ channelId: channel.id }))}
            >
              {`# ${channel.name}`}
            </Button>
            <Dropdown.Toggle split variant={null} className={channel.id === currentChannelId ? 'rounded-0 btn-secondary' : 'rounded-0'}>
              <span className="visually-hidden">{t('dropMenu.menu')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(openWindow({ typeOfForm: 'renameChannelForm', channelId: channel.id }))}>{t('dropMenu.rename')}</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(openWindow({ typeOfForm: 'removeChannelForm', channelId: channel.id }))}>{t('dropMenu.delete')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <button type="button" onClick={() => dispatch(setCurrenChannelId({ channelId: channel.id }))} className={channel.id === currentChannelId ? 'btn w-100 text-start rounded-0 btn-secondary' : 'btn w-100 text-start rounded-0'}>
            {`# ${channel.name}`}
          </button>
        )}
    </li>
  );
};

export default Channel;
