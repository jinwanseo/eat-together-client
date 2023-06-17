import {api} from '../hooks/uesAxios';

interface LoginData {
  email: string;
  password: string;
}

export interface JoinData {
  name: string;
  email: string;
  password: string;
}
export const loginUser = (data: LoginData) => {
  return api({
    url: '/users/login',
    method: 'POST',
    data,
  });
};

export const joinUser = (data: JoinData) => {
  console.log(data);
  return api({
    url: '/users/create',
    method: 'POST',
    data,
  });
};

export const myProfile = () => {
  return api({
    url: '/users/me',
    method: 'GET',
  });
};
