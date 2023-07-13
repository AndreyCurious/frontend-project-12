/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeWindow } from '../../slices/modal';
import dataProcessing from '../../API/socket.jsx';
import { useTranslation } from 'react-i18next';
import { removeAllChannels, setCurrenChannelId } from '../../slices/channels';

const getValidationSchema = (channels) => {
  return yup.object({
    nameChannel: yup.string().trim().required().notOneOf(channels),
  });
};

const AddChannelForm = ({ closeModal }) => {
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channelsData.channels);
  // console.log(channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async (values) => {
      try{
        await dataProcessing('newChannel', { name: values.nameChannel });
        closeModal();
      } catch (err) {
        console.log(err)
      }
    }
  });
  // console.log(channels)
  // dispatch(setCurrenChannelId({ channelId: newChannel.id }))

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              type='text'
              placeholder={t('modal.channelName')}
              disabled={formik.isSubmitting}
              required
              onChange={formik.handleChange}
              name='nameChannel'
              value={formik.nameChannel}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  )
};

const MyModal = () => {
  const mapping = {
    AddChannelForm: AddChannelForm,
  }
  const dispatch = useDispatch();
  
  const closeModal = () => {
    dispatch(closeWindow());
  };
  const isOpened = useSelector((state) => state.modalData.isOpen);
  const type = useSelector((state) => state.modalData.typeOfForm);

  const SelectModal = mapping[type];

  return (
    <Modal show={isOpened} onHide={closeModal} centered>
      { SelectModal ? <SelectModal closeModal={closeModal} /> : null }
    </Modal>
  );
}

export default MyModal;
