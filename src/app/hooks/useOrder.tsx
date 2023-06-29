import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IOrder,
  setOrderList as setStoreOrderList,
} from '../store/slices/orderSlice';

export default function useOrder() {
  const orderList = useSelector((state: RootState) => state.order?.orderList);
  const dispatch = useDispatch();

  const setOrderList = async (orders: IOrder[]): Promise<void> => {
    // 리덕스 저장
    dispatch(setStoreOrderList(orders));
    // 스토리지 저장
    await AsyncStorage.setItem('orderList', JSON.stringify(orders));
  };

  const addOrder = async (order: IOrder): Promise<void> => {
    const orders = JSON.parse(
      (await AsyncStorage.getItem('orderList')) ?? '[]',
    );
    orders.unshift(order);
    dispatch(setStoreOrderList(orders));
    await AsyncStorage.setItem('orderList', JSON.stringify(orders));
  };

  const removeOrder = async (removeId: number): Promise<void> => {
    const orders = JSON.parse(
      (await AsyncStorage.getItem('orderList')) ?? '[]',
    );

    const removeIdx = orders.findIndex((o: IOrder) => o.id === removeId);
    orders.splice(removeIdx, 1);

    dispatch(setStoreOrderList(orders));
    await AsyncStorage.setItem('orderList', JSON.stringify(orders));
  };

  useEffect(() => {
    const initialState = async () => {
      // 리덕스 데이터 확인
      if (!orderList?.length) {
        // 스토리지 데이터 확인
        const storeJsonData = await AsyncStorage.getItem('orderList');
        // 스토리지 데이터 O
        if (storeJsonData) {
          const storeOrderList = JSON.parse(storeJsonData);
          if (storeOrderList?.length) {
            return dispatch(setStoreOrderList(storeOrderList));
          }
        }
      }
    };
    initialState();
  }, [orderList.length, dispatch]);

  return {
    orderList,
    setOrderList,
    addOrder,
    removeOrder,
  };
}
