import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as orderAPI from '../../../../../../app/apis/order';
import OrderItem from './tools/OrderItem';
import useSocket from '../../../../../../app/hooks/useSocket';
import {IOrder} from '../../../../../../app/store/slices/orderSlice';
import useOrder from '../../../../../../app/hooks/useOrder';
import {CButton} from '../../../../../../components/buttons/RButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ListTabLinks} from '../ListTabRoutes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BaseModal from '../../../../../../components/modals/BaseModal';

export default function OrderList() {
  const [open, setOpen] = useState<boolean>();
  const [socket] = useSocket();
  const {orderList, setOrderList, addOrder} = useOrder();
  const navigation: NavigationProp<ListTabLinks> = useNavigation();

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
      // setOpen(true);
      setActiveCard(before => {
        return before === id ? null : id;
      });
    }, []),
  };

  return (
    <View className="static flex-1 space-y-2 p-3">
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
        // style={styles.flatList}
      />
      <View className="absolute right-3 bottom-3 rounded-full bg-white">
        <AntDesign
          name="pluscircle"
          size={60}
          color={'#1B6B93'}
          className={'rounded-full'}
          onPress={() => {
            navigation.navigate('OrderSend');
          }}
        />
      </View>
    </View>
  );
}
