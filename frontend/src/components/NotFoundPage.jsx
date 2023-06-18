import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  console.log(t('notFound.mainPage'));
  return (
    <div className="text-center">
      <img alt={t('notFound.pageNotFound')} className="img-fluid h-25" src="https://market.mosreg.ru/Content/Redesign/img/404.svg" />
      <h1 className="h4 text-muted">
        {t('notFound.pageNotFound')}
      </h1>
      <p className="text-muted">
        {t('notFound.transition')}
        <a href="/">{t('notFound.mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
