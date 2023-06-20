import * as React from 'react';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../../pages/Login';
import Join from '../../pages/Join';
import Home from '../../pages/Home';
import Order from '../../pages/Order';
import Setting from '../../pages/Setting';
import {useNavigation} from '@react-navigation/native';

export type RootStackLinks = {
  Login: undefined;
  Join: undefined;
};
export type RootBottomLinks = {
  Home: undefined;
  Order: undefined;
  Setting: undefined;
  Update: undefined;
};

const Stack = createNativeStackNavigator<RootStackLinks>();
const Tab = createBottomTabNavigator<RootBottomLinks>();

export function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export function BottomRoutes() {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.navigate('Home');
  }, []);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export function RouterContainer() {
  const {token} = useAuth();
  useAxios();

  if (token) return <BottomRoutes />;
  return <StackRoutes />;
}
