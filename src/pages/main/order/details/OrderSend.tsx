import Postcode from '@actbase/react-daum-postcode';
import React, {useState} from 'react';
import {Modal, Platform, Text, View} from 'react-native';
// import useGeolocation from '../../../../app/hooks/useGeolocation';
import {styled} from 'styled-components/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import OrderSendForm from './tools/OrderSendForm';

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
  startCity: Yup.string().nullable(),
  endCity: Yup.string().nullable(),
  pay: Yup.number()
    .typeError('숫자 타입만 가능합니다.')
    .min(1000, '최소 금액 단위는 1000원 입니다.')
    .max(100000, '최대 10만원 까지 설정 가능합니다.')
    .required('수수료 입력은 필수입니다.'),
});

const StyledPostCodeWrapper = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledBtnContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export default function OrderSend() {
  const [isOpen, setOpen] = useState(false);
  // const {currentLocation} = useGeolocation();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(OrderSchema),
  });
  const {setValue, getValues} = methods;

  return (
    <View>
      <OrderSendForm methods={methods} setOpen={setOpen} />

      <Modal animationType="slide" visible={isOpen}>
        <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 50 : 0}}>
          <StyledBtnContainer>
            <ItemBtn style={{marginBottom: 50}} onPress={() => setOpen(false)}>
              <Text>돌아가기</Text>
            </ItemBtn>
          </StyledBtnContainer>
          <StyledPostCodeWrapper>
            <Postcode
              // jsOptions={{animation: true}}
              jsOptions={{animation: true, hideMapBtn: true}}
              style={{width: 320, height: 350}}
              // jsOptions={{animation: true, hideMapBtn: true}}
              onSelected={data => {
                setValue(getValues().type, data.address);
                setValue(
                  getValues().type === 'startAddress' ? 'startCity' : 'endCity',
                  data.bname,
                );
                setOpen(false);
              }}
              onError={() => {}}
            />
          </StyledPostCodeWrapper>
        </View>
      </Modal>
    </View>
  );
}
