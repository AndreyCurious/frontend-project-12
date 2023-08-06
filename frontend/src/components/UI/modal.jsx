import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeWindow } from '../../slices/modal';
import { useApi } from '../../hooks';
import { setCurrenChannelId } from '../../slices/channels';

const getValidationSchema = (channels, t) => (
  yup.object({
    nameChannel: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .notOneOf(channels, t('errors.twiceChannels'))
      .min(3, t('signUp.minName'))
      .max(20, t('signUp.maxName')),
  })
);

const AddChannelForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const api = useApi();
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channelsData.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: getValidationSchema(channelsNames, t),
    onSubmit: async (values) => {
      try {
        const data = await api.newChannel({ name: values.nameChannel });
        dispatch(setCurrenChannelId({
          channelId: data.id,
        }));
        closeModal();
        toast.success(t('toastify.createChannel'));
      } catch (err) {
        console.error(err);
      }
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
              type="text"
              disabled={formik.isSubmitting}
              required
              onChange={formik.handleChange}
              name="nameChannel"
              id="nameChannel"
              value={formik.nameChannel}
              isInvalid={!!formik.errors.nameChannel}
            />
            <label className="visually-hidden" htmlFor="nameChannel">{t('modal.channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.nameChannel}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="secondary"
                type="button"
                onClick={closeModal}
                className="me-2"
              >
                {t('modal.close')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modal.add')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

const RemoveChannelForm = ({ closeModal }) => {
  const api = useApi();
  const { t } = useTranslation();
  const id = useSelector((state) => state.modalData.channelId);
  const removeChannel = async () => {
    try {
      api.removeChannel({ id });
      closeModal();
      toast.success(t('toastify.deleteChannel'));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.removeQuestion')}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          type="button"
          onClick={closeModal}
          className="me-2"
        >
          {t('modal.close')}
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={removeChannel}
        >
          {t('modal.remove')}
        </Button>
      </Modal.Footer>
    </>
  );
};

const RenameChannelForm = ({ closeModal }) => {
  const api = useApi();
  const inputRef = useRef(null);
  const id = useSelector((state) => state.modalData.channelId);
  const channelActive = useSelector((state) => state.channelsData.channels
    .find((channel) => channel.id === id));
  const channels = useSelector((state) => state.channelsData.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      nameChannel: channelActive.name,
    },
    validationSchema: getValidationSchema(channelsNames, t),
    onSubmit: async (values) => {
      try {
        await api.renameChannel({ name: values.nameChannel, id });
        closeModal();
        toast.success(t('toastify.renameChannel'));
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select();
    }, 0);
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              type="text"
              disabled={formik.isSubmitting}
              required
              onChange={formik.handleChange}
              name="nameChannel"
              id="nameChannel"
              value={formik.values.nameChannel}
              isInvalid={formik.touched.nameChannel && !!formik.errors.nameChannel}
            />
            <label className="visually-hidden" htmlFor="nameChannel">{t('modal.channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.nameChannel}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="secondary"
                type="button"
                onClick={closeModal}
                className="me-2"
              >
                {t('modal.close')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modal.add')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

const MyModal = () => {
  const mapping = {
    addChannelForm: AddChannelForm,
    removeChannelForm: RemoveChannelForm,
    renameChannelForm: RenameChannelForm,
  };
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
};

export default MyModal;
