import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import {styled} from 'styled-components/native';

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

const Container = styled.View`
  flex-direction: column;
  gap: 15px;
  padding: 10px 30px;
`;

const ItemButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.btnColor ?? 'grey'};
  padding: 15px;
  border-radius: 10px;
`;

const ItemBtnText = styled.Text`
  color: ${props => props.txtColor ?? 'white'};
`;

interface ICButton {
  label: string;
  onPress: () => void;
  btnColor?: string;
  txtColor?: string;
}

export function CButton({label, onPress, btnColor, txtColor}: ICButton) {
  return (
    <Container>
      <ItemButton onPress={onPress} {...(btnColor && {btnColor})}>
        <ItemBtnText {...(txtColor && {txtColor})}>{label}</ItemBtnText>
      </ItemButton>
    </Container>
  );
}
