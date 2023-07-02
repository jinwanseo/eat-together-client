import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IOrder,
  setAcceptList as setStoreAcceptList,
  setOrderList as setStoreOrderList,
} from '../store/slices/orderSlice';

export default function useOrder() {
  const orderList = useSelector((state: RootState) => state.order?.orderList);
  const dispatch = useDispatch();

  const setOrderList = useCallback(
    async (orders: IOrder[]): Promise<void> => {
      // 리덕스 저장
      dispatch(setStoreOrderList(orders));
      // 스토리지 저장
      await AsyncStorage.setItem('orderList', JSON.stringify(orders));
    },
    [dispatch],
  );

  const addOrder = async (order: IOrder): Promise<void> => {
    const orders = JSON.parse(
      (await AsyncStorage.getItem('orderList')) ?? '[]',
    );
    orders.unshift(order);
    dispatch(setStoreOrderList(orders));
    await AsyncStorage.setItem('orderList', JSON.stringify(orders));
  };

  const acceptOrder = async (acceptId: number): Promise<void> => {
    const orders = JSON.parse(
      (await AsyncStorage.getItem('orderList')) ?? '[]',
    );

    if (orders?.length) {
      const orderIdx = orders.findIndex((o: IOrder) => o.id === acceptId);
      if (orderIdx !== -1 && !!orders[orderIdx]) {
        // Accept List 갱신
        const acceptList = JSON.parse(
          (await AsyncStorage.getItem('acceptList')) ?? '[]',
        );

        acceptList.push(orders[orderIdx]);
        dispatch(setStoreAcceptList(acceptList));
        await AsyncStorage.setItem('acceptList', JSON.stringify(acceptList));
      }
    }
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
  }, [orderList.length, dispatch, setOrderList]);

  return {
    orderList,
    setOrderList,
    addOrder,
    removeOrder,
    acceptOrder,
  };
}
