import React from 'react';
import { useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { openWindow } from '../../slices/modal';

const AddChannelButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="p-0 text-primary border-0 bg-white btn btn-group-vertical"
      onClick={() => dispatch(openWindow({ typeOfForm: 'addChannelForm' }))}
    >
      <PlusSquare size={20} />
      <span className="visually-hidden">+</span>
    </button>
  );
};

export default AddChannelButton;
