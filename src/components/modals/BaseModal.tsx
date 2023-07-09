import React from 'react';
import {Pressable, Text, View} from 'react-native';

function BaseModal() {
  return (
    <React.Fragment>
      <View className="relative z-10">
        <View className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <View className="fixed inset-0 z-10 overflow-y-auto">
            <View className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <View className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <View className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <View className="sm:flex sm:items-start">
                    <View className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></View>
                    <View className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Text
                        className="
                    text-base font-semibold leading-6 text-gray-900
                    ">
                        Deactivate account
                      </Text>
                      <View className="mt-2">
                        <Text
                          className="
                        text-sm text-gray-500
                        ">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Pressable className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                    <Text>Ok</Text>
                  </Pressable>
                  <Pressable className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                    <Text>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

export default BaseModal;
