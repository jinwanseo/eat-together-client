import * as React from 'react';
import {Text, View} from 'react-native';
import useUser from '../app/hooks/useUser';

function Order() {
  const {user} = useUser();
  console.log(user);
  return (
    <View>
      <Text>Order</Text>
    </View>
  );
}

export default Order;
