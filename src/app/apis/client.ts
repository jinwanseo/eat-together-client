import {UpdateUserInput} from '../../pages/main/setting/details/update/UpdateUser';
import {api} from '../hooks/useAxios';

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
  return api({
    url: '/users/create',
    method: 'POST',
    data,
  });
};

export const editUser = (data: UpdateUserInput) => {
  return api({
    url: '/users/update',
    method: 'PATCH',
    data,
  });
};

export const myProfile = () => {
  return api({
    url: '/users/me',
    method: 'GET',
  });
};

export const checkPw = (data: {password: string}) => {
  return api({
    url: 'users/password',
    method: 'POST',
    data,
  });
};
