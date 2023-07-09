import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../pages/main/home/Home';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import SettingRoutes from './setting/SettingRoutes';
import OrderRoutes from './order/OrderRoutes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="home"
              color={focused ? '#4fa3ff' : '#000000'}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderRoutes}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="delivery-dining"
              color={focused ? '#4fa3ff' : '#000000'}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingRoutes}
        options={{
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="setting"
              color={focused ? '#4fa3ff' : '#000000'}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
