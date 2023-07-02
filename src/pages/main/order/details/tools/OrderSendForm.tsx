import React from 'react';
import {RHInput} from '../../../../../components/forms/RHFInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CButton} from '../../../../../components/buttons/RButton';
import {styled} from 'styled-components/native';
import * as orderAPI from '../../../../../app/apis/order';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const FormWrapper = styled.View`
  flex-direction: column;
  gap: 15px;
`;

export default function OrderSendForm({methods, setOpen}: any) {
  const navigator: NavigationProp<any> = useNavigation();
  const {control, setValue, getValues} = methods;
  const handlers = {
    onPressStartAddressBtn: () => {
      setValue('type', 'startAddress');
      setOpen(true);
    },
    onPressEndAddressBtn: () => {
      setValue('type', 'endAddress');
      setOpen(true);
    },
    onSubmit: async () => {
      //여기서 주문 정보 업로드
      const {startAddress, endAddress, startCity, endCity, pay} = getValues();
      const res = await orderAPI.createOrder({
        startAddress,
        endAddress,
        startCity,
        endCity,
        pay: +pay,
      });
      if (res.status >= 300) {
        return Alert.alert(
          '주문 신청 중 에러 발생',
          '잠시 후 다시 시도해주세요',
        );
      }

      navigator.navigate('Order', {screen: 'OrderList'});
    },
  };
  return (
    <KeyboardAwareScrollView>
      <FormWrapper>
        <RHInput
          label={'출발지'}
          control={control}
          name={'startAddress'}
          onPress={handlers.onPressStartAddressBtn}
          placeholder={'클릭 후 선택해주세요'}
          editable={false}
          selectTextOnFocus={false}
        />
        <RHInput
          label={'도착지'}
          control={control}
          name={'endAddress'}
          onPress={handlers.onPressEndAddressBtn}
          placeholder={'클릭 후 선택해주세요'}
          editable={false}
          selectTextOnFocus={false}
        />

        <RHInput
          label={'수수료'}
          name={'pay'}
          control={control}
          placeholder="수수료를 입력해주세요"
        />

        <CButton label="주문하기" onPress={handlers.onSubmit} />
      </FormWrapper>
    </KeyboardAwareScrollView>
  );
}
