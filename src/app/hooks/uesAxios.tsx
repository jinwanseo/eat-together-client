import {useEffect} from 'react';
import axios from 'axios';
import {Platform} from 'react-native';
import useUser from './useAuth';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8888' : 'http://localhost:8888';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

export default function useAxios() {
  const {user} = useUser();

  const handlers = {
    onRequest: async (config: any) => {
      // 토큰
      if (user?.token) {
        config.headers['authorization'] = user.token;
      }

      return config;
    },
    onResponse: (response: any) => {
      return response;
    },
    onError: (err: any) => {
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
