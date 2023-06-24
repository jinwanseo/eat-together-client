import {StyleSheet, View} from 'react-native';
import React from 'react';
import RButton from '../../../../../components/buttons/RButton';

export default function ItemBottomBtns() {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {flex: 1, flexDirection: 'row', gap: 10},
  btnStyle: {backgroundColor: '#1FAB89'},
  btnTxtStyle: {fontSize: 13},
});
