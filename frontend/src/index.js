import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line
  root.render(await init(socket));
};

app();
