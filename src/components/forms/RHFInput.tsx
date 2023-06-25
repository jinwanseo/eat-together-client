import React from 'react';
import {Controller} from 'react-hook-form';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {styled} from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  gap: 15px;
  padding: 10px 30px;
`;

const ItemLabel = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #393c3f;
`;

const ErrorText = styled.Text`
  color: tomato;
`;

interface IRHFInput {
  name: string;
  label: string;
  control: any;
  secureTextEntry?: boolean;
}

export default function RHFInput({name, label, control, ...props}: IRHFInput) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <View style={styles.wrapper}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.textInput}
            value={field?.value ?? ''}
            onChangeText={field?.onChange}
            {...props}
          />
          {fieldState?.error?.message && (
            <Text style={styles.errorMsg}>{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 15,
  },
  errorMsg: {
    color: '#F24C3D',
    fontSize: 15,
  },
  label: {
    fontSize: 17,
  },
  textInput: {
    fontSize: 16,
    borderBottomColor: '#9BA4B5',
    borderBottomWidth: 0.5,
  },
});

const ItemInput = styled.TextInput`
  border-bottom-width: 0.5px;
  border-bottom-color: #9ba4b5;
  /* font-size: 0px; */
  background-color: #f1f1f1;
`;

interface IRHInput {
  name: string;
  label: string;
  control: any;
  onPress?: () => void;
  placeholder?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  secureTextEntry?: boolean;
}

export function RHInput({name, label, control, onPress, ...props}: IRHInput) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <Container>
          <ItemLabel>{label}</ItemLabel>
          <Pressable onPress={onPress}>
            <ItemInput
              onChangeText={field?.onChange}
              value={field?.value ?? ''}
              onPressIn={onPress}
              {...props}
            />
          </Pressable>
          {fieldState?.error?.message && (
            <ErrorText style={styles.errorMsg}>
              {fieldState.error.message}
            </ErrorText>
          )}
        </Container>
      )}
    />
  );
}
