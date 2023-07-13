import React, { useEffect, useRef } from 'react';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import dataProcessing from '../../API/socket.jsx';
import useAuth from '../../hooks/index.js';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const auth = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      try {
        await dataProcessing('newMessage', { name: auth.user, msg: values.message, currentChannelId });
        inputRef.current.focus();
        inputRef.current.value = '';
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: yup.object({
      message: yup.string().required().trim(),
    }),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);
  /* eslint-disable */
  return (
      <div className="mt-auto px-5 py-3">
        <form className="py-1 border rounded-2 align-items-center" onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              name="message"
              required
              placeholder={t('chatPage.inputMessage')}
              disabled={formik.isSubmitting}
              className="border-0 p-0 ps-2 form-control"
              onChange={formik.handleChange}
              value={formik.message}
            />
            <button className="btn border-0" type="submit" disabled={!formik.dirty || !formik.isValid}>
              <ArrowRightCircleFill size={30} />
            </button>
          </div>
        </form>
      </div>
  );
};

export default MessageForm;
