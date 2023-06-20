import {useEffect} from 'react';
import axios from 'axios';
import {Platform} from 'react-native';
import useAuth from './useAuth';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8888' : 'http://localhost:8888';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function useAxios() {
  const {token, setLogout} = useAuth();

  const handlers = {
    onRequest: async (config: any) => {
      // 토큰
      if (token) {
        config.headers['authorization'] = token;
      }

      return config;
    },
    onResponse: (response: any) => {
      return response;
    },
    onError: (err: any) => {
      // 토큰 만료인 경우
      if (err.response.status === 403) {
        setLogout();
      }
      return err;
    },
  };

  const requestInterceptor = api.interceptors.request.use(handlers.onRequest);
  const responseInterceptor = api.interceptors.response.use(
    response => handlers.onResponse(response),
    error => handlers.onError(error),
  );
  useEffect(() => {
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}
