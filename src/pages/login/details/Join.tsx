import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {RootStackLinks} from '../LoginRoutes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RHFInput from '../../../components/forms/RHFInput';
import RButton from '../../../components/buttons/RButton';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as clientAPI from '../../../app/apis/client';

const JoinSchema = yup.object().shape({
  name: yup.string().min(3, '최소 3글자 이상').max(20, '최대 20글자 미만'),
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .email('이메일 형식으로 입력해주세요'),
  password: yup
    .string()
    .min(5, '최소 5글자 이상 입력')
    .max(20, '최대 20글자 미만 입력')
    .required('비밀번호를 입력해주세요'),
  passwordChk: yup
    .string()
    .test('passwords-match', '비밀번호와 틀림', function (passwordChk) {
      return this.parent.password === passwordChk;
    }),
});

function Join() {
  const {navigate} = useNavigation<NavigationProp<RootStackLinks>>();
  const {handleSubmit, control, setError} = useForm({
    mode: 'onChange',
    resolver: yupResolver(JoinSchema),
  });

  const handlers = {
    onSubmit: async (uploadData: any) => {
      delete uploadData.passwordChk;
      const {data} = await clientAPI.joinUser(uploadData);
      if (!data?.ok) return setError('passwordChk', {message: data.error});
      Alert.alert('회원 가입 완료 🎉', '로그인 페이지로 이동합니다.');
      navigate('Login');
    },
  };

  const navigation: NavigationProp<RootStackLinks> = useNavigation();

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
        <RHFInput control={control} name="name" label="가입자명" />
      </View>
      <View style={styled.contentWrapper}>
        <RHFInput control={control} name="email" label="로그인 이메일" />
      </View>
      <View style={styled.contentWrapper}>
        <RHFInput
          control={control}
          name="password"
          label="비밀번호"
          secureTextEntry={true}
        />
      </View>
      <View style={styled.contentWrapper}>
        <RHFInput
          control={control}
          name="passwordChk"
          label="비밀번호 확인"
          secureTextEntry={true}
        />
      </View>

      <View style={styled.buttonWrapper}>
        <RButton
          label="로그인 페이지로 이동"
          onPress={() => navigation.navigate('Login')}
        />
        <RButton
          label="회원가입완료"
          onPress={handleSubmit(handlers.onSubmit)}
          btnStyle={styled.loginBtn}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Join;

const styled = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageTag: {
    width: 280,
    height: 100,
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
