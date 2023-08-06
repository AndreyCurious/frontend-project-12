import React, { useEffect, useRef } from 'react';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import { useAuth, useApi } from '../../hooks/index.js';

const MessageForm = () => {
  const api = useApi();
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const auth = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      const filtredMsg = leoProfanity.clean(values.message);
      try {
        await api.newMessage({ name: auth.user, msg: filtredMsg, currentChannelId });
        formik.values.message = '';
      } catch (err) {
        console.error(err);
      }
    },
    validationSchema: yup.object({
      message: yup.string().required().trim(),
    }),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, formik.values.message]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex">
        <Form.Control
          ref={inputRef}
          type="text"
          name="message"
          required
          placeholder={t('chatPage.inputMessage')}
          aria-label={t('chatPage.label')}
          disabled={formik.isSubmitting}
          className="p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <button className="btn border-0" type="submit" disabled={!formik.dirty || !formik.isValid}>
          <ArrowRightCircleFill size={30} />
          <span className="visually-hidden">{t('chatPage.send')}</span>
        </button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
