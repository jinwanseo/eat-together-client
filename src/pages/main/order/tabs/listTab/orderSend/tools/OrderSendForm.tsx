import React from 'react';
import RHFInput from '../../../../../../../components/forms/RHFInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RButton from '../../../../../../../components/buttons/RButton';
import {styled} from 'styled-components/native';
import * as orderAPI from '../../../../../../../app/apis/order';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const FormWrapper = styled.View`
  flex-direction: column;
  gap: 15px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  padding: 0 30px;
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
    onLinkList: () => {
      navigator.navigate('ListTab', {screen: 'OrderList'});
    },
    onSubmit: async () => {
      //여기서 주문 정보 업로드
      const {title, startAddress, endAddress, startCity, endCity, pay} =
        getValues();
      const res = await orderAPI.createOrder({
        title,
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

      navigator.navigate('MyTab');
    },
  };
  return (
    <KeyboardAwareScrollView>
      <FormWrapper>
        <RHFInput control={control} name="title" label="제목" />
        <RHFInput
          control={control}
          label={'출발지'}
          name={'startAddress'}
          placeholder={'클릭 후 선택해주세요'}
          editable={false}
          selectTextOnFocus={false}
          onPressIn={handlers.onPressStartAddressBtn}
        />
        <RHFInput
          label={'도착지'}
          control={control}
          name={'endAddress'}
          onPressIn={handlers.onPressEndAddressBtn}
          placeholder={'클릭 후 선택해주세요'}
          editable={false}
          selectTextOnFocus={false}
        />

        <RHFInput
          label={'수수료'}
          name={'pay'}
          control={control}
          placeholder="수수료를 입력해주세요"
        />

        <ButtonWrapper>
          <RButton label="돌아가기" onPress={handlers.onLinkList} />
          <RButton label="주문하기" onPress={handlers.onSubmit} />
        </ButtonWrapper>
      </FormWrapper>
    </KeyboardAwareScrollView>
  );
}
