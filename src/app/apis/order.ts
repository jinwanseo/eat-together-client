import {api} from '../hooks/useAxios';

export const getOrderList = () => {
  return api({
    method: 'GET',
    url: '/orders/list',
  });
};
