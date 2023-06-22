import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './details/Login';
import Join from './details/Join';

export type RootStackLinks = {
  Login: undefined;
  Join: undefined;
};
const Stack = createNativeStackNavigator<RootStackLinks>();

function LoginRoutes() {
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
export default LoginRoutes;
