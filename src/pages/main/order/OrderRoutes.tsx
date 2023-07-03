import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabRoutes from './tabs/myTab/MyTabRoutes';
import ListTabRoutes from './tabs/listTab/ListTabRoutes';
import {useNavigation} from '@react-navigation/native';

export type OrderLinks = {
  ListTab: undefined;
  MyTab: undefined;
};
const Tab = createMaterialTopTabNavigator<OrderLinks>();

function OrderRoutes() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListTab"
        component={ListTabRoutes}
        options={{title: '주문 리스트'}}
        listeners={{
          tabPress: () => navigation.navigate('OrderList'),
        }}
      />
      <Tab.Screen
        name="MyTab"
        component={MyTabRoutes}
        options={{title: '마이 주문'}}
      />
    </Tab.Navigator>
  );
}

export default OrderRoutes;
