/* eslint-disable */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import useAuth from '../../hooks/index.js';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const rollbar = useRollbar();
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userAuth, setUserAuth] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setUserAuth(false);
      try {
        const response = await axios.post('api/v1/signup', values);
        auth.logIn(response.data);
        return navigate('/')
      } catch (e) {
        rollbar.error(err);
        if (e.response.status === 409) {
          setUserAuth(true);
        } else {
          console.log(e);
        }
      }
      return null;
    },
    validationSchema: yup.object({
      password: yup.string().required(t('signUp.required')).min(6, t('signUp.minPass')),
      username: yup.string().required(t('signUp.required')).min(3, t('signUp.minName')).max(20, t('signUp.maxName')),
      confirmPassword: yup.string().required(t('signUp.required')).oneOf([yup.ref('password')], t('signUp.difPass')),
    }),
  });
  return (
    <Form onSubmit={formik.handleSubmit} className='w-50 align-items-center d-flex flex-column'>
      <h1 className="text-center">{t('signUp.registration')}</h1>
      <Form.Group className="m-2 position-relative">
        <Form.Control
          placeholder={t('signUp.username')}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="username"
          value={formik.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
        />
        <label className="visually-hidden" htmlFor="username">{t('signUp.username')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="m-2 position-relative">
        <Form.Control
          type="password"
          placeholder={t('signUp.password')}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="password"
          value={formik.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <label className="visually-hidden" htmlFor="password">{t('signUp.password')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="m-2 mb-4 position-relative">
        <Form.Control
          type="password"
          placeholder={t('signUp.confirmPassword')}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="confirmPassword"
          value={formik.confirmPassword}
          isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
        />
        <label className="visually-hidden" htmlFor="confirmPassword">{t('signUp.confirmPassword')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <div>
        <Button variant='outline-primary' type="submit">{t('signUp.submit')}</Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
