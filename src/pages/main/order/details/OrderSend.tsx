import Postcode from '@actbase/react-daum-postcode';
import React, {useState} from 'react';
import {Modal, Platform, Text, View} from 'react-native';
import useGeolocation from '../../../../app/hooks/useGeolocation';
import {styled} from 'styled-components/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RHInput} from '../../../../components/forms/RHFInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {CButton} from '../../../../components/buttons/RButton';

const FormWrapper = styled.View`
  flex-direction: column;
  gap: 15px;
`;

const ItemBtn = styled.Pressable`
  background-color: #526d82;
  height: 50px;
  border-radius: 13px;
  justify-content: center;
  align-items: center;
`;

const OrderSchema = Yup.object().shape({
  type: Yup.string().oneOf(['startAddress', 'endAddress']).required(),
  startAddress: Yup.string().required('출발지 설정은 필수입니다'),
  endAddress: Yup.string().required('도착지 설정은 필수입니다'),
  pay: Yup.number()
    .typeError('숫자 타입만 가능합니다.')
    .min(1000, '최소 금액 단위는 1000원 입니다.')
    .max(100000, '최대 10만원 까지 설정 가능합니다.')
    .required('수수료 입력은 필수입니다.'),
});

export default function OrderSend() {
  const [isOpen, setOpen] = useState(false);
  const {currentLocation} = useGeolocation();

  const {control, setValue, getValues} = useForm({
    mode: 'onChange',
    resolver: yupResolver(OrderSchema),
  });

  const handlers = {
    onPressStartAddressBtn: () => {
      setValue('type', 'startAddress');
      setOpen(true);
    },
    onPressEndAddressBtn: () => {
      setValue('type', 'endAddress');
      setOpen(true);
    },
  };
  console.log(getValues());

  console.log(currentLocation);
  return (
    <View>
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

          <CButton
            label="주문하기"
            onPress={() => {
              //여기서 주문 정보 업로드
            }}
          />
        </FormWrapper>
      </KeyboardAwareScrollView>

      <Modal animationType="slide" visible={isOpen}>
        <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 50 : 0}}>
          <ItemBtn style={{marginBottom: 50}} onPress={() => setOpen(false)}>
            <Text>돌아가기</Text>
          </ItemBtn>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Postcode
              // jsOptions={{animation: true}}
              jsOptions={{animation: true, hideMapBtn: true}}
              style={{width: 320, height: 350}}
              // jsOptions={{animation: true, hideMapBtn: true}}
              onSelected={data => {
                console.log(data);
                setValue(getValues().type, data.bname);
                setOpen(false);
              }}
              onError={() => {}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
