import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateChk from './tools/UpdateChk';
import UpdateUser from './tools/UpdateUser';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export type UpdateLinks = {
  UpdateChk: undefined;
  UpdateUser: undefined;
};
const Stack = createNativeStackNavigator<UpdateLinks>();

export default function Update() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UpdateChk"
        component={UpdateChk}
        options={{
          headerLeft: () => (
            <Button
              onPress={() =>
                navigation.navigate('Setting', {screen: 'Profile'})
              }
              title={'⬅'}
              color="black"
            />
          ),
        }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
