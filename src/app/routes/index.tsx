import * as React from 'react';
import useUser from '../hooks/useAuth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Login from '../../pages/Login';
import Join from '../../pages/Join';
import Home from '../../pages/Home';
import Order from '../../pages/Order';
import useAxios from '../hooks/uesAxios';

export type RootStackLinks = {
  Login: undefined;
  Join: undefined;
};
export type RootBottomLinks = {
  Home: undefined;
  Order: undefined;
};

const Stack = createNativeStackNavigator<RootStackLinks>();
const Tab = createBottomTabNavigator<RootBottomLinks>();

export function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Join" component={Join} />
    </Stack.Navigator>
  );
}

export function BottomRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={Order} />
    </Tab.Navigator>
  );
}

export function RouterContainer() {
  useAxios();
  const {isLoggedIn} = useUser();

  return (
    <NavigationContainer>
      {isLoggedIn ? <BottomRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
}
