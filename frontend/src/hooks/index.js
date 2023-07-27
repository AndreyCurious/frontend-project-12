import { useContext } from 'react';
import { AuthContext, ApiContext } from '../contexts/index.js';

const useAuth = () => useContext(AuthContext);
const useApi = () => {
  const api = useContext(ApiContext);
  return api;
};

export { useAuth, useApi };
