import {useColorScheme} from 'nativewind';
import React from 'react';
import {Switch} from 'react-native';

function ThemeSwitch() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  return <Switch onChange={toggleColorScheme} value={colorScheme === 'dark'} />;
}

export default ThemeSwitch;
