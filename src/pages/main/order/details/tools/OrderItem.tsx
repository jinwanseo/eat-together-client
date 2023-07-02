import {Pressable, View} from 'react-native';
import React from 'react';
import ItemTitle from './ItemTitle';
import MiniMap from './MiniMap';
import ItemBottomBtns from './ItemBottomBtns';
import {styled} from 'styled-components/native';
import {IOrder} from '../../../../../app/store/slices/orderSlice';

type OrderItemProps = {
  item: IOrder;
  isActive: boolean;
  onPressItem: (id: number) => void;
};

const StyledPressable = styled(Pressable)`
  border-color: #b8b0b0;
  border-width: 2px;
  padding: 23px;
  border-radius: 11px;
  gap: 10px;
  margin-bottom: 10px;
`;

const StyledOrderDetail = styled(View)`
  gap: 10px;
`;

function OrderItem({item, onPressItem, isActive}: OrderItemProps) {
  return (
    <StyledPressable onPress={() => onPressItem(item.id)}>
      <ItemTitle {...item} />
      {isActive && (
        <StyledOrderDetail>
          <MiniMap {...item} />
          <ItemBottomBtns {...item} />
        </StyledOrderDetail>
      )}
    </StyledPressable>
  );
}

export default OrderItem;
