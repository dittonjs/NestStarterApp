import { useEffect, useRef } from 'react';

export const useJwtRefresh = (authToken, setAuthToken) => {
  const refreshTimer = useRef(null);
  useEffect(() => {
    clearTimeout(refreshTimer.current);
    if (authToken) {
      refreshTimer.current = setTimeout(async () => {
        const result = await fetch('/refresh_token').then((res) => res.json());
        if (result.token) {
          setAuthToken(result.token);
        } else {
          setAuthToken(null);
        }
      }, 60000 * 10); // 10 minutes
    }
    return () => clearTimeout(refreshTimer.current);
  }, [authToken]);
};
