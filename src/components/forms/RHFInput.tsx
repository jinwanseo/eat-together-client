import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';

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
