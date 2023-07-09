import {Pressable, Text, View} from 'react-native';
import React from 'react';
import ItemTitle from './ItemTitle';
import MiniMap from '../tools/MiniMap';
import ItemBottomBtns from './ItemBottomBtns';
import {styled} from 'styled-components/native';
import {IOrder} from '../../../../../../../app/store/slices/orderSlice';
import {formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';

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
    <View className="flex flex-row border-b-[0.5px] border-gray-500/40 py-3">
      <View className="flex flex-col space-y-1 w-2/5">
        <View className="flex flex-row">
          <View className="bg-rose-300/80 rounded-sm px-1 py-1">
            <Text className="text-[12px] text-rose-950">출발지</Text>
          </View>
          <View className="px-1 py-1">
            <Text className="text-[12px] text-rose-950">{item.start.name}</Text>
          </View>
        </View>
        <View className="flex flex-row">
          <View className="bg-indigo-300/80 rounded-sm px-1 py-1">
            <Text className="text-[12px] text-indigo-950">도착지</Text>
          </View>
          <View className="px-1 py-1">
            <Text className="text-[12px] text-indigo-950">{item.end.name}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col space-y-1">
        <View className="">
          <Text className="text-sm text-slate-700">~~~ 배달 원합니다</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-[10px] text-slate-700/80">
            {item.client.name}
          </Text>
          <Text className="text-[12px] text-slate-700/40">∙</Text>
          <Text className="text-[12px] text-slate-700/80">
            {formatDistanceToNow(new Date(item.updatedAt), {
              addSuffix: true,
              locale: ko,
            })}
          </Text>
        </View>
        <View className="flex flex-row space-x-2 items-center">
          <View className="bg-indigo-300/80 rounded-sm px-1 py-1">
            <Text className="text-[10px]">{item.state}</Text>
          </View>
          <Text className="text-[11px] text-slate-700 font-extrabold">
            {item.pay.toLocaleString()} 원
          </Text>
        </View>
      </View>
    </View>
    // <StyledPressable onPress={() => onPressItem(item.id)}>
    //   <ItemTitle {...item} />
    //   {isActive && (
    //     <StyledOrderDetail>
    //       <MiniMap {...item} />
    //       <ItemBottomBtns {...item} />
    //     </StyledOrderDetail>
    //   )}
    // </StyledPressable>
  );
}

export default OrderItem;
