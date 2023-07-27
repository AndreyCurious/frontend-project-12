import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useMemo } from 'react';
import Login from './Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './NotFoundPage.jsx';
import PageChat from './PageChat.jsx';

import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';
import Navbar from './UI/navbar.jsx';
import Signup from './SignUp.jsx';

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="" element={<PageChat />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
