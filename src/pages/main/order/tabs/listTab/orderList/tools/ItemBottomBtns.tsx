import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import RButton from '../../../../../../../components/buttons/RButton';
import useOrder from '../../../../../../../app/hooks/useOrder';
import {IOrder} from '../../../../../../../app/store/slices/orderSlice';
import * as orderAPI from '../../../../../../../app/apis/order';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ItemBottomBtns({id}: IOrder) {
  const {acceptOrder, removeOrder} = useOrder();

  const handlers = {
    acceptOrder: useCallback(async (): Promise<void> => {
      // 1.  accept 서버 발송 / 결과 받f
      const res: any = await orderAPI.acceptOrder(id);

      // 2. 다른사람이 먼저 수락한 주문일시 (예외처리 + 리스트 주문 삭제)
      if (res?.response?.status >= 300) {
        Alert.alert('수락 불가', res.response.data.message);
        // 수락한 주문 삭제
        removeOrder(id);
        return;
      }

      // 3. 주문 수락 처리
      acceptOrder(id);
      // 4. 수락한 주문 리스트에서 삭제
      removeOrder(id);
    }, [acceptOrder, id, removeOrder]),
  };

  return (
    <View className="flex flex-row justify-between items-center p-3">
      <Pressable className="">
        <AntDesign name="hearto" size={23} style={{opacity: 0.6}} />
      </Pressable>
      <Pressable className="px-5 py-3 rounded-lg bg-teal-600 ">
        <Text className="text-slate-50/95 font-semibold">채팅하기</Text>
      </Pressable>
    </View>
  );
}
