import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
