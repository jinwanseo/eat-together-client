import React, {useCallback, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
// import useSocket from '../../../../app/hooks/useSocket';
import RButton from '../../../../components/buttons/RButton';
import MapView from 'react-native-maps';

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
      <View style={styles.item}>
        <View style={styles.location}>
          <Text style={[styles.firstTxt, styles.fontColor]}>출발지</Text>
          <Text style={[styles.secondTxt, styles.fontColor]}>:</Text>
          <Text style={[styles.thirdTxt, styles.fontColor]}>
            {item.startAdd}
          </Text>
        </View>
        <View style={styles.location}>
          <Text style={[styles.firstTxt, styles.fontColor]}>목적지</Text>
          <Text style={[styles.secondTxt, styles.fontColor]}>:</Text>
          <Text style={[styles.thirdTxt, styles.fontColor]}>{item.endAdd}</Text>
        </View>
        <View style={styles.location}>
          <Text style={[styles.firstTxt, styles.fontColor]}>수수료</Text>
          <Text style={[styles.secondTxt, styles.fontColor]}>:</Text>
          <Text style={[styles.thirdTxt, styles.fontColor]}>{item.pay}원</Text>
        </View>
      </View>
      {item.isActive && (
        <View style={{gap: 10}}>
          <View style={{height: 300}}>
            <MapView
              style={{width: '100%', height: '100%'}}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
            <RButton
              label="수락"
              textStyle={{fontSize: 13}}
              btnStyle={{backgroundColor: '#1FAB89'}}
            />
            <RButton
              label="거절"
              textStyle={{fontSize: 13}}
              btnStyle={{backgroundColor: '#F29727'}}
            />
          </View>
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
      {/* <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
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
    // backgroundColor: '#B8B0B0',
    borderColor: '#B8B0B0',
    borderWidth: 2,
    padding: 23,
    borderRadius: 11,
    gap: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  firstTxt: {
    fontSize: 12,
    fontWeight: '500',
  },
  secondTxt: {
    fontSize: 10,
  },
  thirdTxt: {
    fontSize: 14,
    fontWeight: '600',
  },
  fontColor: {
    color: '#1E2022',
  },
});
