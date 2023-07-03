import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderList from './orderList/OrderList';
import OrderSend from './orderSend/OrderSend';

export type ListTabLinks = {
  OrderList: undefined;
  OrderSend: undefined;
};

const Stack = createNativeStackNavigator<ListTabLinks>();

export default function ListTabRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSend"
        component={OrderSend}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
