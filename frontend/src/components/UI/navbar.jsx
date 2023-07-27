import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';

const Navbar = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <nav className="navbar navbar-light bg-white border-bottom border-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg" alt="logo" width="30" height="30" className="d-inline-blick align-top" />
          {' '}
          Hexlet Chat
        </a>
        {auth.user ? <button onClick={auth.logOut} type="button" className="btn btn-primary">{t('login.logout')}</button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
