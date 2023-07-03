import {Alert, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import RButton from '../../../../../../../components/buttons/RButton';
import useOrder from '../../../../../../../app/hooks/useOrder';
import {IOrder} from '../../../../../../../app/store/slices/orderSlice';
import * as orderAPI from '../../../../../../../app/apis/order';

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
    <View style={styles.btnWrapper}>
      <RButton
        label="수락"
        textStyle={styles.btnTxtStyle}
        btnStyle={styles.btnStyle}
        onPress={handlers.acceptOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {flex: 1, flexDirection: 'row', gap: 10},
  btnStyle: {backgroundColor: '#1FAB89'},
  btnTxtStyle: {fontSize: 13},
});
