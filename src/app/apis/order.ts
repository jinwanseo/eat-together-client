import {api} from '../hooks/useAxios';

export const getOrderList = () => {
  return api({
    method: 'GET',
    url: '/orders/list',
  });
};

export const createOrder = data => {
  return api({
    method: 'POST',
    url: '/orders',
    data,
  });
};
