import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

interface IRHFInput {
  name: string;
  label: string;
  control: any;
  secureTextEntry?: boolean;
  placeholder?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  onPressIn?: () => void;
}

export default function RHFInput({name, label, control, ...props}: IRHFInput) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <View className="flex flex-col space-y-3">
          <Text className={'block text-lg font-medium text-slate-700'}>
            {label}
          </Text>
          <TextInput
            className="px-3 py-3 bg-slate-50 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
            value={field?.value ?? ''}
            onChangeText={field?.onChange}
            {...props}
          />
          {fieldState?.error?.message && (
            <Text className="text-rose-600 dark:text-rose-300">
              {fieldState.error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
