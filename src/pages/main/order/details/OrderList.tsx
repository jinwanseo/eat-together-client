import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import * as orderAPI from '../../../../app/apis/order';
import OrderItem from './tools/OrderItem';
import {styled} from 'styled-components/native';
import useSocket from '../../../../app/hooks/useSocket';
import {IOrder} from '../../../../app/store/slices/orderSlice';
import useOrder from '../../../../app/hooks/useOrder';

const OrderItems = styled(View)`
  flex: 1;
`;

export default function OrderList() {
  const [socket] = useSocket();
  const {orderList, setOrderList, addOrder} = useOrder();

  // 실시간 데이터 GET
  useEffect(() => {
    const addOrderCallback = ({data}: {data: IOrder}) => addOrder(data);
    if (socket) {
      socket?.on('order', addOrderCallback);
    }
    return () => {
      if (socket) {
        socket.off('order', addOrderCallback);
      }
    };
  }, [socket, addOrder]);

  // 주문 리스트 GET
  useEffect(() => {
    // 주문 리스트 GET
    const getItems = async () => {
      try {
        const {data} = await orderAPI.getOrderList();
        if (data?.ok) {
          setOrderList(data?.results);
        }
      } catch (error) {
        return Alert.alert(
          '조회 실패',
          '주문정보 불러오기를 실패했습니다. 앱을 다시 실행해주세요',
        );
      }
    };
    getItems();
  }, [setOrderList]);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handlers = {
    onPressItem: useCallback((id: number) => {
      setActiveCard(before => {
        return before === id ? null : id;
      });
    }, []),
  };

  return (
    <OrderItems>
      <FlatList
        data={orderList}
        keyExtractor={(item: IOrder) => `order-${item.id}`}
        renderItem={({item}: ListRenderItemInfo<IOrder>) => (
          <OrderItem
            item={item}
            onPressItem={handlers.onPressItem}
            isActive={item.id === activeCard}
          />
        )}
        style={styles.flatList}
      />
    </OrderItems>
  );
}
const styles = StyleSheet.create({
  flatList: {padding: 30},
});
