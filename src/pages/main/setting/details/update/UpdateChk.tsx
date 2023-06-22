import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import * as loginAPI from '../../../../../app/apis/client';
import RHFInput from '../../../../../components/forms/RHFInput';
import FullLogoImg from '../../../../../asset/images/logo_full.png';
import RButton from '../../../../../components/buttons/RButton';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {UpdateLinks} from '../Update';

const LoginSchema = yup.object().shape({
  password: yup.string().required('비밀번호를 입력해주세요'),
});

function UpdateChk() {
  const {handleSubmit, control, setError} = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });
  const navigation: NavigationProp<UpdateLinks> = useNavigation();
  const handlers = {
    onPressCheck: async (uploadData: any) => {
      const {data} = await loginAPI.checkPw(uploadData);

      if (!data?.ok) {
        return setError('password', {message: data?.error});
      } else if (!data?.result) {
        return setError('password', {message: '비밀번호 틀림'});
      }

      navigation.navigate('Update', {screen: 'UpdateUser'});
    },
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styled.imageWrapper}>
        <Image
          source={FullLogoImg}
          style={styled.imageTag}
          resizeMode="contain"
        />
      </View>

      <View style={styled.contentWrapper}>
        <RHFInput
          control={control}
          name="password"
          label="비밀번호"
          secureTextEntry={true}
        />
      </View>
      <View style={styled.buttonWrapper}>
        <RButton
          label="뒤로가기"
          onPress={() => {
            navigation.navigate('Setting', {screen: 'Profile'});
          }}
          // btnStyle={styled.loginBtn}
        />
        <RButton
          label="인증 완료"
          onPress={handleSubmit(handlers.onPressCheck)}
          btnStyle={styled.loginBtn}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styled = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  imageTag: {
    width: 280,
    height: 150,
  },
  contentWrapper: {
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    gap: 10,
  },
  loginBtn: {backgroundColor: '#4F709C'},
  joinBtn: {backgroundColor: '#FF8551'},
});

export default UpdateChk;
