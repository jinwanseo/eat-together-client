import {Pressable, Text, View} from 'react-native';
import React from 'react';
import ItemTitle from './ItemTitle';
import MiniMap from '../tools/MiniMap';
import ItemBottomBtns from './ItemBottomBtns';
import {styled} from 'styled-components/native';
import {IOrder} from '../../../../../../../app/store/slices/orderSlice';
import {formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type OrderItemProps = {
  item: IOrder;
  isActive: boolean;
  onPressItem: (id: number) => void;
};

function OrderItem({item, onPressItem, isActive}: OrderItemProps) {
  return (
    <Pressable
      className={`${
        isActive ? 'border-b-[0.5px] border-gray-500/40' : ''
      } pb-2`}
      onPress={() => onPressItem(item.id)}>
      <View
        className={`flex flex-row ${
          isActive ? '' : 'border-b-[0.5px] border-gray-500/40'
        } py-3`}>
        {/* 출발지 / 도착지 */}
        <View className="flex flex-col space-y-2 w-2/5">
          {/* 출발지 */}
          <View className="flex flex-row">
            <View className="bg-rose-300/80 rounded-sm px-1 py-1">
              <Text className="text-[12px] text-rose-950">출발지</Text>
            </View>
            <View className="px-1 py-1">
              <Text className="text-[12px] text-rose-950">
                {item.start.name}
              </Text>
            </View>
          </View>
          {/* 도착지 */}
          <View className="flex flex-row">
            <View className="bg-indigo-300/80 rounded-sm px-1 py-1">
              <Text className="text-[12px] text-indigo-950">도착지</Text>
            </View>
            <View className="px-1 py-1">
              <Text className="text-[12px] text-indigo-950">
                {item.end.name}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col justify-between w-3/5 space-y-[1.7]">
          <View>
            {/* 제목 */}
            <View>
              <Text className="text-sm text-slate-700">{item.title}</Text>
            </View>
            {/* 클라이언트 이름 / 업로드 시간 */}
            <View className="flex flex-row items-center">
              <Text className="text-[10px] text-slate-700/80">
                {item.client.name}
              </Text>
              <Text className="text-[12px] text-slate-700/40">∙</Text>
              <Text className="text-[12px] text-slate-700/80">
                {item.updatedAt &&
                  formatDistanceToNow(new Date(item.updatedAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
              </Text>
            </View>
          </View>
          {/* 상태 / 가격 */}
          <View className="flex flex-row space-x-2 items-center">
            <View className="bg-indigo-300/80 rounded-sm px-1 py-1">
              <Text className="text-[10px]">{item.state}</Text>
            </View>
            <Text className="text-[11px] text-slate-700 font-extrabold">
              {item.pay.toLocaleString()} 원
            </Text>
          </View>
          <View className="flex flex-row justify-end items-center space-x-3">
            <View className="flex flex-row items-center space-x-1">
              <Ionicons name="ios-chatbubbles-outline" size={20} />
              <Text className="‘">1</Text>
            </View>
            <View className="flex flex-row items-center space-x-1">
              <AntDesign name="hearto" size={20} />
              <Text>1</Text>
            </View>
          </View>
        </View>
      </View>
      {isActive && (
        <View className="flex flex-col">
          <MiniMap {...item} />
          <ItemBottomBtns {...item} />
        </View>
      )}
    </Pressable>
  );
}

export default OrderItem;
