/*eslint-disable*/
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react'
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/index.js';
import { useNavigate } from 'react-router-dom';

const EnterForm = () => {
  const rollbar = useRollbar();
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setUserAuth(false);
      try {
        const response = await axios.post('api/v1/login', values);
        auth.logIn(response.data)
        return navigate('/');
      } catch (e) {
        rollbar.error(e);
        if (e.response.status === 401) {
          setUserAuth(true);
        } else {
          toast.error(t('toastify.networkErr'))
        }
      }
      return null;
    },
    validationSchema: yup.object({
      password: yup.string().required(t('login.shemaRequired')),
      username: yup.string().required(t('login.shemaRequired')),
    }),

  });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('login.header')}</h1>
      <div className="form-floating">
        <input
          className="form-control mb-3 w-100 rounded border border-primary"
          onChange={formik.handleChange}
          name="username"
          id="username"
          autoComplete="username"
          required
          value={formik.values.username}
          placeholder={t('login.username')}
        />
        <label htmlFor="password">{t('login.username')}</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control mb-3 h-20 w-100 rounded border border-primary"
          name="password"
          id="password"
          required
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('login.password')}
        />
        <label className="form-label" htmlFor="password">{t('chatPage.label')}</label>
      </div>
      <button
        type="submit"
        className="mb-3 w-100 btn btn-outline-primary btn-lg"
      >
        {t('login.submit')}
      </button>
      {userAuth
        ? <h6 className="text-danger" title=""><strong>{t('login.authFailed')}</strong></h6>
        : <div className="p-4" />}
    </form>
  );
};

export default EnterForm;
