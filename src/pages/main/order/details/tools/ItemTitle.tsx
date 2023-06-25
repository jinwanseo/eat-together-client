import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LocationType} from '../OrderList';

interface ItemTitleProps {
  start: LocationType;
  end: LocationType;
  pay: number;
}

/**
 * @title 각 카드 타이틀 (출발지, 목적지, 수수료)
 */
function ItemTitle({start, end, pay}: ItemTitleProps) {
  return (
    <View style={styles.item}>
      <View style={styles.location}>
        <Text style={[styles.firstTxt, styles.fontColor]}>출발지</Text>
        <Text style={[styles.secondTxt, styles.fontColor]}>:</Text>
        <Text style={[styles.thirdTxt, styles.fontColor]}>{start.name}</Text>
      </View>
      <View style={styles.location}>
        <Text style={[styles.firstTxt, styles.fontColor]}>목적지</Text>
        <Text style={[styles.secondTxt, styles.fontColor]}>:</Text>
        <Text style={[styles.thirdTxt, styles.fontColor]}>{end.name}</Text>
      </View>
      <View style={styles.location}>
        <Text style={[styles.firstTxt, styles.fontColor]}>수수료</Text>
        <Text style={[styles.secondTxt, styles.fontColor]}>:</Text>
        <Text style={[styles.thirdTxt, styles.fontColor]}>{pay}원</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: 10,
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  firstTxt: {
    fontSize: 12,
    fontWeight: '500',
  },
  secondTxt: {
    fontSize: 10,
  },
  thirdTxt: {
    fontSize: 14,
    fontWeight: '600',
  },
  fontColor: {
    color: '#1E2022',
  },
});
export default ItemTitle;
