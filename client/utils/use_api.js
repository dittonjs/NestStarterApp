import { useRef } from 'react';

export const useApi = (authToken) => {
  const apiRef = useRef(new Api());
  apiRef.current.authToken = authToken;
  return apiRef.current;
};

export class Api {
  authToken = null;

  makeRequest(url, method, body) {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
      body,
    }).then((res) => res.json());
  }

  get(url) {
    return this.makeRequest(url, 'GET');
  }

  post(url, body = {}) {
    return this.makeRequest(url, 'POST', body);
  }

  put(url, body = {}) {
    return this.makeRequest(url, 'PUT', body);
  }

  del(url) {
    return this.makeRequest(url, 'DELETE');
  }
}
