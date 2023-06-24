import React, {useCallback, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
// import useSocket from '../../../../app/hooks/useSocket';

import ItemTItle from './tools/ItemTitle';
import MiniMap from './tools/MiniMap';
import ItemBottomBtns from './tools/ItemBottomBtns';

interface IOrderItem {
  onPressItem: (id: number) => void;
  isActive: boolean;
}
interface IOrder {
  id: number;
  startAdd: string;
  endAdd: string;
  pay: number;
}

function OrderItem(item: IOrder & IOrderItem) {
  return (
    <Pressable
      style={styles.itemWrapper}
      onPress={() => item.onPressItem(item.id)}>
      <ItemTItle {...item} />
      {item.isActive && (
        <View style={{gap: 10}}>
          <MiniMap />
          <ItemBottomBtns />
        </View>
      )}
    </Pressable>
  );
}

const items: IOrder[] = [
  {
    id: 1,
    startAdd: '삼성동',
    endAdd: '반포동',
    pay: 8000,
  },
  {
    id: 2,
    startAdd: '압구정',
    endAdd: '신사동',
    pay: 8000,
  },
  {
    id: 3,
    startAdd: '청담동',
    endAdd: '여의도동',
    pay: 8000,
  },
];

export default function OrderList() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handlers = {
    onPressItem: useCallback((id: number) => {
      setActiveCard(before => {
        return before === id ? null : id;
      });
    }, []),
  };
  // const [socket, disconnect] = useSocket();
  // const {token} = useAuth();

  // useEffect(() => {
  //   if (socket && token) {
  //     socket.emit('order', {data: 'order'});

  //     socket.on('order', ({data}) => appendOrderList(data));
  //   }
  //   return () => {
  //     if (socket) {
  //       socket.off('order', ({data}) => appendOrderList(data));
  //     }
  //   };
  // }, [token, socket, appendOrderList]);

  // useEffect(() => {
  //   if (!token) {
  //     console.log('!isLoggedIn', !token);
  //     disconnect();
  //   }
  // }, [token, disconnect]);
  return (
    <View style={styles.items}>
      <FlatList
        data={items}
        keyExtractor={(item: IOrder) => item.id + '_'}
        renderItem={({item}) => (
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
