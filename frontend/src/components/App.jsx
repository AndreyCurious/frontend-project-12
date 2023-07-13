import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import Login from './Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './NotFoundPage.jsx';
import PageChat from './PageChat.jsx';

import { AuthContext } from '../contexts/index.js';
import useAuth from '../hooks/index.js';
import Navbar from './UI/navbar.jsx';

const AuthProvider = ({ children }) => {
  const userCurrent = localStorage.getItem('user');
  const [user, setUser] = useState(userCurrent);
  const props = useMemo(() => {
    const logIn = (registrationData) => {
      localStorage.setItem('user', registrationData.username);
      localStorage.setItem('token', registrationData.token);
      setUser(registrationData);
    };

    const getAuthData = () => {
      const userCurToken = localStorage.getItem('token');
      return userCurToken ? { Authorization: `Bearer ${userCurToken}` } : {};
    };

    return { user, logIn, getAuthData };
  }, [user]);
  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column bg-light vh-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="" element={<PageChat />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
