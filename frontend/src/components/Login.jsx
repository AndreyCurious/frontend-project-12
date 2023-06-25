// import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
/* eslint-disable */
const Login = () => {
  const { t } = useTranslation();

  const [userAuth, setUserAuth] = useState(false)

  const formik = useFormik( {
    initialValues: {
      username: '', 
      password: '',
    },
    onSubmit: async values => {
      const response = await axios.post('api/v1/login', values)
        .then(response => console.log(response))
    },
  })

  const enterSchema = yup.object().shape({
    nickname: yup.string().required(t('login.shemaRequired')),
    password: yup.string().required(t('login.shemaRequired')),
  })
  return (
      <div className='container-fluid vh-100'>
        <div className='row justify-content-center align-content-center h-100'>
          <div className='col-12 col-md-8 col-xxl-6'>
            <div className='card shadow-sm border border-primary'>
              <div className='card-body row p-5 justify-content-center'>
                <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                  <img alt={t('login.submit')} src='https://media.istockphoto.com/id/1219353692/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D0%B8-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8-%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%BE%D0%B9%D1%82%D0%B8-%D0%B7%D0%B0%D1%89%D0%B8%D1%82%D0%B0-%D0%BB%D0%B8%D1%87%D0%BD%D0%BE%D0%B9.jpg?s=1024x1024&w=is&k=20&c=WOoFoLbl9WzQTxNktXSEYskJLjoH_AI6ZmP5OSABbhw=' width={'200px'} height={'200px'} className='rounded-circle rounded mx-auto d-block'/>
                </div>
                <form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                  <h1 className='text-center mb-4'>{t('login.header')}</h1>
                  <div className='form-floating'>
                    <input 
                      className='form-control mb-3 w-100 rounded border border-primary'
                      onChange={formik.handleChange}
                      name='username' 
                      id='username'
                      autoComplete='username'
                      required 
                      value={formik.values.username}
                      placeholder={t('login.username')}
                    />
                    <label htmlFor='password'>{t('login.username')}</label>
                  </div>
                  <div className='form-floating'>
                    <input 
                      className='form-control mb-3 h-20 w-100 rounded border border-primary'
                      name='password' 
                      id='password'
                      required 
                      type='password' 
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('login.password')}
                    />
                    <label htmlFor='password'>{t('login.password')}</label>
                  </div>
                  <button
                    type='submit' 
                    className='mb-3 w-100 btn btn-outline-primary btn-lg'
                    variant='outline-primary'
                  >
                  {t('login.submit')}
                  </button>
                </form>
              </div>
              <div className='card-footer text-center p-4'>
                <div className=''>
                  <span className='p-2'>{t('login.newToChat')}</span>
                  <a href="/signup">{t('login.signup')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};
/* eslint-enable */
export default Login;
