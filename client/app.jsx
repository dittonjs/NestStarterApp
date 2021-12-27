import { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './components/router';
import { ApiContext } from './utils/api_context';
import { AuthContext } from './utils/auth_context';
import { useApi } from './utils/use_api';
import { useJwtRefresh } from './utils/use_jwt_refresh';
import { RolesContext } from './utils/roles_context';
import { parseJwt } from './utils/parse_jwt';
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

  const jwtPayload = parseJwt(authToken);

  // don't display anything while trying to get user token
  // can display a loading screen here if desired
  if (loading) return null;

  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      <ApiContext.Provider value={api}>
        <RolesContext.Provider value={jwtPayload.roles}>
          <HashRouter>
            <Router />
          </HashRouter>
        </RolesContext.Provider>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};
