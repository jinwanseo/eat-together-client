import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import * as orderAPI from '../../../../app/apis/order';
// import useSocket from '../../../../app/hooks/useSocket';

import ItemTitle from './tools/ItemTitle';
import MiniMap from './tools/MiniMap';
import ItemBottomBtns from './tools/ItemBottomBtns';

type OrderItemProps = IOrder & {
  isActive: boolean;
  onPressItem: (id: number) => void;
};

function OrderItem(item: OrderItemProps) {
  return (
    <Pressable
      style={styles.itemWrapper}
      onPress={() => item.onPressItem(item.id)}>
      <ItemTitle {...item} />
      {item.isActive && (
        <View style={{gap: 10}}>
          <MiniMap {...item} />
          <ItemBottomBtns />
        </View>
      )}
    </Pressable>
  );
}

export interface LocationType {
  name: string;
  latitude: string;
  longitude: string;
}

export interface IOrder {
  id: number;
  pay: number;
  start: LocationType;
  end: LocationType;
  state: string;
}

export default function OrderList() {
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  useEffect(() => {
    // 주문 리스트 GET
    const getItems = async () => {
      try {
        const {data} = await orderAPI.getOrderList();
        if (data?.ok) return setOrderList(data?.results);
      } catch (error) {
        return Alert.alert(
          '조회 실패',
          '주문정보 불러오기를 실패했습니다. 앱을 다시 실행해주세요',
        );
      }
    };
    getItems();
  }, []);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handlers = {
    onPressItem: useCallback((id: number) => {
      setActiveCard(before => {
        return before === id ? null : id;
      });
    }, []),
  };

  return (
    <View style={styles.items}>
      <FlatList
        data={orderList}
        keyExtractor={(item: IOrder) => `order-${item.id}`}
        renderItem={({item}: ListRenderItemInfo<IOrder>) => (
          <OrderItem
            {...item}
            onPressItem={handlers.onPressItem}
            isActive={item.id === activeCard}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    flex: 1,
    padding: 30,
  },
  itemWrapper: {
    borderColor: '#B8B0B0',
    borderWidth: 2,
    padding: 23,
    borderRadius: 11,
    gap: 10,
    marginBottom: 10,
  },
});
