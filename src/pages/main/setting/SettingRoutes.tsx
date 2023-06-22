import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile from './details/Profile';
import Update from './details/Update';

export type SettingLinks = {
  Profile: undefined;
  Update: undefined;
};
const Stack = createNativeStackNavigator<SettingLinks>();

function SettingRoutes() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SettingRoutes;
