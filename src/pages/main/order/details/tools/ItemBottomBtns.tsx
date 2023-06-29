import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import RButton from '../../../../../components/buttons/RButton';
import useOrder from '../../../../../app/hooks/useOrder';
import {IOrder} from '../../../../../app/store/slices/orderSlice';

export default function ItemBottomBtns({id, ...others}: IOrder) {
  const {removeOrder} = useOrder();

  const handlers = {
    onClickReject: useCallback(() => {
      removeOrder(id);
    }, [removeOrder, id]),
  };
  return (
    <View style={styles.btnWrapper}>
      <RButton
        label="수락"
        textStyle={styles.btnTxtStyle}
        btnStyle={styles.btnStyle}
      />
      <RButton
        label="거절"
        textStyle={styles.btnTxtStyle}
        btnStyle={styles.btnStyle}
        onPress={handlers.onClickReject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {flex: 1, flexDirection: 'row', gap: 10},
  btnStyle: {backgroundColor: '#1FAB89'},
  btnTxtStyle: {fontSize: 13},
});
