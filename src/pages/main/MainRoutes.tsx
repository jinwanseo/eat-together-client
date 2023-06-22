import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../pages/main/home/Home';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import SettingRoutes from './setting/SettingRoutes';
import OrderRoutes from './order/OrderRoutes';

export type MainRouteLinks = {
  Home: undefined;
  Order: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator<MainRouteLinks>();

export function MainRoutes() {
  const navigation = useNavigation<NavigationProp<MainRouteLinks>>();
  React.useEffect(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={OrderRoutes} />
      <Tab.Screen name="Setting" component={SettingRoutes} />
    </Tab.Navigator>
  );
}
