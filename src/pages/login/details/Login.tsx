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
import {useColorScheme} from 'nativewind';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .email('이메일 형식으로 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

function Login() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
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
      <View className="flex flex-col items-center justify-center android:h-[300] ios:h-[400]">
        <View className="flex flex-row items-center justify-center space-x-2">
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
        <View className="flex flex-row space-x-3 justify-center items-center">
          <Pressable
            className={
              'flex flex-row px-5 py-4 space-x-3 justify-center items-center bg-emerald-500 dark:bg-emerald-300/95 rounded-lg flex-grow'
            }
            onPress={handleSubmit(handlers.onPressLogin)}>
            <View>
              <AntDesign name="login" size={24} color="#beeadd" />
            </View>
            <View>
              <Text className="text-slate-50">로그인</Text>
            </View>
          </Pressable>

          <Pressable
            className={
              'flex flex-row px-5 py-4 space-x-3 justify-center items-center bg-indigo-500 dark:bg-indigo-300/95 rounded-lg flex-grow'
            }
            onPress={handlers.onPressJoin}>
            <View>
              <Text className="text-slate-50">회원가입</Text>
            </View>
            <View>
              <AntDesign name="adduser" size={24} color="#beeadd" />
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;
