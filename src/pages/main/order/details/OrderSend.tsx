import React from 'react';
import {Text, View} from 'react-native';
import useGeolocation from '../../../../app/hooks/useGeolocation';

export default function OrderSend() {
  const {currentLocation} = useGeolocation();

  console.log(currentLocation);
  return (
    <View>
      <Text>OrderSend</Text>
    </View>
  );
}
