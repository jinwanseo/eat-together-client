import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import {RootStackLinks} from '../LoginRoutes';
import * as loginAPI from '../../../app/apis/client';
import RHFInput from '../../../components/forms/RHFInput';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import useAuth from '../../../app/hooks/useAuth';
import jwt_decode from 'jwt-decode';
import useUser from '../../../app/hooks/useUser';
import {UserSlice} from '../../../app/store/slices/userSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      try {
        const res = await loginAPI.loginUser(uploadData);
        // 로그인 실패시.
        if (!res?.data?.ok) {
          return setError('password', {message: res.data.error});
        }

        // 로그인 성공시
        // 토큰 저장
        setToken(res.data.token);
        const decoded: UserSlice = jwt_decode(res.data.token);

        // 유저 기본 정보 저장
        setUser(decoded);
      } catch {
        Alert.alert('통신 오류', '잠시 후 다시 시도해주세요');
      }
    },
    onPressJoin: () => {
      navigation.navigate('Join');
    },
  };
  return (
    <KeyboardAwareScrollView className="flex flex-col w-screen h-screen bg-slate-200/95 dark:bg-slate-900/95 gap-2">
      <View className="flex flex-col items-center justify-center android:h-[300] ios:h-[340]">
        <View className="flex flex-row items-center justify-center gap-2">
          <Image
            className="h-[45] w-[50]"
            source={require('../../../asset/images/logo_icon.png')}
            resizeMode="contain"
          />
          <Text className="text-4xl font-semibold text-slate-600 dark:text-slate-50/60 ">
            TOGETHER
          </Text>
        </View>
      </View>

      <View className="flex flex-col px-10 space-y-6">
        <View>
          <RHFInput control={control} name="email" label="로그인 아이디" />
        </View>
        <View>
          <RHFInput
            control={control}
            name="password"
            label="비밀번호"
            secureTextEntry={true}
          />
        </View>
        <View className="flex flex-row gap-5 justify-center items-center">
          <Pressable
            className={'p-5'}
            onPress={handleSubmit(handlers.onPressLogin)}>
            <AntDesign name="login" color="black" size={24} />
            <Text>로그인</Text>
          </Pressable>

          <Pressable className="p-5" onPress={handlers.onPressJoin}>
            <Text>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;
