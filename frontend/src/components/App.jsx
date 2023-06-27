import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './NotFoundPage.jsx';
import Chat from './chat.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);

export default App;
