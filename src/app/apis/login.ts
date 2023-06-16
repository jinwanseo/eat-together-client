import {api} from '../hooks/uesAxios';

interface LoginData {
  email: string;
  password: string;
}
export const loginUser = (data: LoginData) => {
  console.log(data);
  return api({
    url: '/users/login',
    method: 'POST',
    data,
  });
};
