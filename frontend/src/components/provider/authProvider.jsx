import React, { useState, useMemo } from 'react';
import { AuthContext } from '../../contexts/index.js';

const AuthProvider = ({ children }) => {
  const userCurrent = localStorage.getItem('user');
  const [user, setUser] = useState(userCurrent);
  const props = useMemo(() => {
    const logIn = (registrationData) => {
      localStorage.setItem('user', registrationData.username);
      localStorage.setItem('token', registrationData.token);
      setUser(registrationData.username);
    };

    const logOut = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(false);
    };

    const getAuthData = () => {
      const userCurToken = localStorage.getItem('token');
      return userCurToken ? { Authorization: `Bearer ${userCurToken}` } : {};
    };

    return {
      user,
      logIn,
      getAuthData,
      logOut,
    };
  }, [user]);
  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
