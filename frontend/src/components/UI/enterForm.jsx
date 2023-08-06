import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

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
        const response = await axios.post(routes.axiosLogin(), values);
        auth.logIn(response.data);
        return navigate(routes.chat());
      } catch (e) {
        rollbar.error(e);
        if (e.response.status === 401) {
          setUserAuth(true);
        } else {
          toast.error(t('toastify.networkErr'));
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
    <Form onSubmit={formik.handleSubmit} className="col-md-5">
      <h1 className="text-center mb-4">{t('login.header')}</h1>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 w-100 rounded border border-primary"
          name="username"
          id="username"
          required
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('login.username')}
          autoComplete="username"
        />
        <label className="ms-2 form-label" htmlFor="username">{t('login.username')}</label>
      </Form.Group>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 h-2  0 w-100 rounded border border-primary"
          name="password"
          id="password"
          required
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('login.password')}
          autoComplete="password"
        />
        <label className="ms-2 form-label" htmlFor="password">{t('login.password')}</label>
      </Form.Group>
      <Button
        type="submit"
        className="mb-3 w-100 btn-lg"
        variant="outline-primary"
      >
        {t('login.submit')}
      </Button>
      {userAuth
        ? <h6 className="text-danger text-center" title=""><strong>{t('login.authFailed')}</strong></h6>
        : <div className="p-4" />}
    </Form>
  );
};

export default EnterForm;
