import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

const RegistrationForm = () => {
  const [signUser, setSignUser] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setSignUser(false);
        const response = await axios.post(routes.axiosSignup(), values);
        auth.logIn(response.data);
        return navigate(routes.chat());
      } catch (e) {
        if (e.response.status === 409) {
          setSignUser(true);
        } else {
          toast.error(t('toastify.networkErr'));
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
    <Form onSubmit={formik.handleSubmit} className="w-50 align-items-center d-flex flex-column">
      <h1 className="text-center">{t('signUp.registration')}</h1>
      <Form.Group className="m-2 position-relative form-floating">
        <Form.Control
          placeholder={t('signUp.username')}
          id="username"
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          autoComplete="username"
          onChange={formik.handleChange}
          name="username"
          value={formik.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
        />
        <label htmlFor="username">{t('signUp.username')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="m-2 position-relative form-floating">
        <Form.Control
          type="password"
          id="password"
          placeholder={t('signUp.password')}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="password"
          value={formik.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <label htmlFor="password">{t('signUp.password')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="m-2 position-relative form-floating">
        <Form.Control
          type="password"
          id="confirmPassword"
          placeholder={t('signUp.confirmPassword')}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="confirmPassword"
          value={formik.confirmPassword}
          isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
          className="mb-2"
        />
        <label htmlFor="confirmPassword">{t('signUp.confirmPassword')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      {signUser
        ? <h6 className="text-danger w-50 text-center mb-3" title=""><strong>{t('signUp.sameUsers')}</strong></h6>
        : <div />}
      <div>
        <Button variant="outline-primary" type="submit">{t('signUp.submit')}</Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
