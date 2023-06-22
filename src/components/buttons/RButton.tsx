import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
interface BtnInterface {
  label: string;
  onPress?:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined
    | undefined;
  textStyle?: any;
  btnStyle?: any;
}

export default function RButton({
  onPress,
  label,
  textStyle,
  btnStyle,
}: BtnInterface) {
  return (
    <Pressable
      style={
        btnStyle ? [styles.loginBtnWrapper, btnStyle] : styles.loginBtnWrapper
      }
      onPress={onPress}>
      <Text
        style={textStyle ? [styles.buttonText, textStyle] : styles.buttonText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
  },
  loginBtnWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 15,
    color: '#FAF0E4',
  },
});
