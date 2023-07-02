// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Form from './UI/form';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid vh-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm border border-primary">
            <div className="card-body row p-5 justify-content-center">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img alt={t('login.submit')} src="https://media.istockphoto.com/id/1219353692/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D0%B8-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8-%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%BE%D0%B9%D1%82%D0%B8-%D0%B7%D0%B0%D1%89%D0%B8%D1%82%D0%B0-%D0%BB%D0%B8%D1%87%D0%BD%D0%BE%D0%B9.jpg?s=1024x1024&w=is&k=20&c=WOoFoLbl9WzQTxNktXSEYskJLjoH_AI6ZmP5OSABbhw=" width="200px" height="200px" className="rounded-circle rounded mx-auto d-block" />
              </div>
              <Form />
            </div>
            <div className="card-footer text-center p-4">
              <div className="">
                <span className="p-2">{t('login.newToChat')}</span>
                <a href="/signup">{t('login.signup')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
