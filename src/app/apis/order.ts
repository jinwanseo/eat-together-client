import {api} from '../hooks/useAxios';

export const getOrderList = () => {
  return api({
    method: 'GET',
    url: '/orders/list',
  });
};

export const createOrder = (data: any) => {
  return api({
    method: 'POST',
    url: '/orders',
    data,
  });
};
