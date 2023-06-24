import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image, StyleSheet, View} from 'react-native';
import {RootStackLinks} from '../LoginRoutes';
import * as loginAPI from '../../../app/apis/client';
import RHFInput from '../../../components/forms/RHFInput';
import {useForm} from 'react-hook-form';

import RButton from '../../../components/buttons/RButton';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import useAuth from '../../../app/hooks/useAuth';
import jwt_decode from 'jwt-decode';
import useUser from '../../../app/hooks/useUser';
import {UserSlice} from '../../../app/store/slices/userSlice';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .email('이메일 형식으로 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

function Login() {
  const {setToken} = useAuth();
  const {setUser} = useUser();
  const {handleSubmit, control, setError} = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });
  const navigation: NavigationProp<RootStackLinks> = useNavigation();
  const handlers = {
    onPressLogin: async (uploadData: any) => {
      const {data} = await loginAPI.loginUser(uploadData);

      // 로그인 실패시.
      if (!data?.ok) {
        return setError('password', {message: data.error});
      }

      // 로그인 성공시
      // 토큰 저장
      setToken(data.token);
      const decoded: UserSlice = jwt_decode(data.token);

      // 유저 기본 정보 저장
      setUser(decoded);
    },
    onPressJoin: () => {
      navigation.navigate('Join');
    },
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styled.imageWrapper}>
        <Image
          source={require('../../../asset/images/logo_full.png')}
          style={styled.imageTag}
          resizeMode="contain"
        />
      </View>
      <View style={styled.contentWrapper}>
        <RHFInput control={control} name="email" label="로그인 아이디" />
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
          label="로그인"
          onPress={handleSubmit(handlers.onPressLogin)}
          btnStyle={styled.loginBtn}
        />

        <RButton
          label="회원가입"
          onPress={handlers.onPressJoin}
          btnStyle={styled.joinBtn}
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

export default Login;
