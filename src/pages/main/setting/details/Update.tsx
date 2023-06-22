import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateChk from './update/UpdateChk';
import UpdateUser from './update/UpdateUser';

export type UpdateLinks = {
  UpdateChk: undefined;
  UpdateUser: undefined;
};
const Stack = createNativeStackNavigator<UpdateLinks>();

export default function Update() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UpdateChk"
        component={UpdateChk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
