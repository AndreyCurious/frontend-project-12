import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Login from './Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './NotFoundPage.jsx';
import PageChat from './PageChat.jsx';

import AuthProvider from './provider/authProvider.jsx';
import { useAuth } from '../hooks/index.js';
import Navbar from './UI/navbar.jsx';
import Signup from './SignUp.jsx';
import routes from '../routes.js';

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
          <Route path={routes.login()} element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={routes.signup()} element={<Signup />} />
          <Route path={routes.chat()} element={<PrivateOutlet />}>
            <Route path="" element={<PageChat />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
