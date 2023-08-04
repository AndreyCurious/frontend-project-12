import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-5 h-100">
      <img alt={t('notFound.pageNotFound')} className="img-fluid h-100" src="https://market.mosreg.ru/Content/Redesign/img/404.svg" />
      <h1 className="h4 text-muted">
        {t('notFound.pageNotFound')}
      </h1>
      <p className="text-muted mb-5">
        {t('notFound.transition')}
        <Link href={routes.login()}>{t('notFound.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
