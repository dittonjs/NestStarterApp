import { useRef } from 'react';

export const useApi = (authToken) => {
  const apiRef = useRef(new Api());
  apiRef.current.authToken = authToken;
  return apiRef.current;
};

export class Api {
  authToken = null;

  makeRequest(url, method, body) {
    const options = {};
    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(body);
    }
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
      },
      ...options,
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
