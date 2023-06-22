import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderSend from './details/OrderSend';
import OrderList from './details/OrderList';

type OrderLinks = {
  OrderList: undefined;
  OrderSend: undefined;
};
const Tab = createMaterialTopTabNavigator<OrderLinks>();

function OrderRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="OrderList"
        component={OrderList}
        options={{title: '주문 리스트'}}
      />
      <Tab.Screen
        name="OrderSend"
        component={OrderSend}
        options={{title: '주문 신청'}}
      />
    </Tab.Navigator>
  );
}

export default OrderRoutes;
