import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import {RootStackLinks} from '../app/routes';

function Join() {
  const navigation: NavigationProp<RootStackLinks> = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Join Screen</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Go to Detail</Text>
      </Pressable>
    </View>
  );
}

export default Join;
