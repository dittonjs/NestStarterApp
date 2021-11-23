import { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './components/router';
import { ApiContext } from './utils/api_context';
import { AuthContext } from './utils/auth_context';
import { useApi } from './utils/use_api';
import { useJwtRefresh } from './utils/use_jwt_refresh';
import './app.css';

export const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh the jwt token automatically
  useJwtRefresh(authToken, setAuthToken);

  // api instance
  const api = useApi(authToken);

  // get initial jwt using refresh token
  useEffect(async () => {
    const result = await api.get('/refresh_token');
    if (result.token) {
      setAuthToken(result.token);
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      <ApiContext.Provider value={api}>
        <HashRouter>
          <Router />
        </HashRouter>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};
