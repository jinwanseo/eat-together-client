import {Modal, Platform, Pressable, Text, View} from 'react-native';
import React from 'react';
import {styled} from 'styled-components/native';
import Postcode from '@actbase/react-daum-postcode';
import {UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import {OnCompleteParams} from '@actbase/react-daum-postcode/lib/types';

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

const ItemBtn = styled(Pressable)`
  background-color: #526d82;
  height: 50px;
  border-radius: 13px;
  justify-content: center;
  align-items: center;
`;

const StyledPostCode = styled(Postcode)`
  height: 350px;
  width: 320px;
`;

interface OrderModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  methods: {
    setValue: UseFormSetValue<{
      type: NonNullable<'startAddress' | 'endAddress' | undefined>;
      startAddress: string;
      endAddress: string;
      startCity: string | null | undefined;
      endCity: string | null | undefined;
      pay: number;
    }>;
    getValues: UseFormGetValues<{
      type: NonNullable<'startAddress' | 'endAddress' | undefined>;
      startAddress: string;
      endAddress: string;
      startCity: string | null | undefined;
      endCity: string | null | undefined;
      pay: number;
    }>;
  };
}

export default function OrderModal({open, setOpen, methods}: OrderModalProps) {
  const {setValue, getValues} = methods;

  return (
    <Modal animationType="slide" visible={open}>
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 50 : 0}}>
        <StyledBtnContainer>
          <ItemBtn style={{marginBottom: 50}} onPress={() => setOpen(false)}>
            <Text>돌아가기</Text>
          </ItemBtn>
        </StyledBtnContainer>
        <StyledPostCodeWrapper>
          <StyledPostCode
            jsOptions={{animation: true, hideMapBtn: true}}
            onSelected={(data: OnCompleteParams) => {
              const {type} = getValues();
              setValue(type, data.address);
              setValue(
                type === 'startAddress' ? 'startCity' : 'endCity',
                data.bname,
              );

              setOpen(false);
            }}
            onError={() => {}}
          />
        </StyledPostCodeWrapper>
      </View>
    </Modal>
  );
}
