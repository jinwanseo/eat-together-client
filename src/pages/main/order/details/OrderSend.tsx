import React, {useState} from 'react';
import {View} from 'react-native';
// import useGeolocation from '../../../../app/hooks/useGeolocation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import OrderSendForm from './tools/OrderSendForm';
import OrderModal from './tools/OrderModal';

const OrderSchema = Yup.object().shape({
  type: Yup.string().oneOf(['startAddress', 'endAddress']).required(),
  startAddress: Yup.string().required('출발지 설정은 필수입니다'),
  endAddress: Yup.string().required('도착지 설정은 필수입니다'),
  startCity: Yup.string().nullable(),
  endCity: Yup.string().nullable(),
  pay: Yup.number()
    .typeError('숫자 타입만 가능합니다.')
    .min(1000, '최소 금액 단위는 1000원 입니다.')
    .max(100000, '최대 10만원 까지 설정 가능합니다.')
    .required('수수료 입력은 필수입니다.'),
});

export default function OrderSend() {
  const [isOpen, setOpen] = useState(false);
  // const {currentLocation} = useGeolocation();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(OrderSchema),
  });

  return (
    <View>
      {/* 주문 폼 */}
      <OrderSendForm methods={methods} setOpen={setOpen} />

      {/* 출발 / 도착지 설정 지도 모달 */}
      <OrderModal methods={methods} open={isOpen} setOpen={setOpen} />
    </View>
  );
}
