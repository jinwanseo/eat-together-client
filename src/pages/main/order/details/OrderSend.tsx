import Postcode from '@actbase/react-daum-postcode';
import React, {useState} from 'react';
import {Button, Dimensions, Modal, Text, View} from 'react-native';
import useGeolocation from '../../../../app/hooks/useGeolocation';
import {styled} from 'styled-components/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const FormWrapper = styled.View`
  flex-direction: column;
  gap: 15px;
`;

const ItemWrapper = styled.View`
  flex-direction: column;
  gap: 15px;
  padding: 10px 30px;
`;

const ItemLabel = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #393c3f;
`;

const ItemInput = styled.TextInput`
  border-bottom-width: 0.5px;
  border-bottom-color: #9ba4b5;
  font-size: 30px;
  background-color: #f1f1f1;
  outline: none;
`;

const ItemBtn = styled.Pressable`
  background-color: #526d82;
  height: 50px;
  border-radius: 13px;
  justify-content: center;
  align-items: center;
`;

const ItemBtnTxt = styled.Text`
  font-size: 18px;
  color: white;
`;

// const ItemBtn = styled.Button`
//   background-color: ''
// `

export default function OrderSend() {
  const [isStartModal, setStartModal] = useState(false);
  const [isEndModal, setEndModal] = useState(false);
  const {currentLocation} = useGeolocation();

  useForm({
    mode: 'onChange',

    // resolver: yupResolver()
  });

  const handlers = {
    onPressStartAddressBtn: () => {
      setStartModal(true);
    },
    onPressEndAddressBtn: () => {
      setEndModal(true);
    },
  };

  console.log(currentLocation);
  return (
    <View>
      <FormWrapper>
        <ItemWrapper>
          <ItemLabel>출발지 주소</ItemLabel>
          <ItemBtn onPress={handlers.onPressStartAddressBtn}>
            <ItemBtnTxt>주소 찾기</ItemBtnTxt>
          </ItemBtn>
        </ItemWrapper>
        <ItemWrapper>
          <ItemLabel>도착지 주소</ItemLabel>
          <ItemBtn onPress={handlers.onPressEndAddressBtn}>
            <ItemBtnTxt>주소 찾기</ItemBtnTxt>
          </ItemBtn>
        </ItemWrapper>
      </FormWrapper>

      <Modal animationType="slide" visible={isStartModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Postcode
            jsOptions={{animation: true}}
            // jsOptions={{animation: true, hideMapBtn: true}}
            style={{width: 320, height: 320}}
            // jsOptions={{animation: true, hideMapBtn: true}}
            onSelected={data => {
              console.log(data);
              setStartModal(false);
            }}
          />
          <ItemBtn onPress={() => setStartModal(false)}>
            <Text>돌아가기</Text>
          </ItemBtn>
        </View>
      </Modal>
    </View>
  );
}
