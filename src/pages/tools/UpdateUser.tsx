import * as React from 'react';
import FullLogoImg from '../../asset/images/logo_full.png';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RHFInput from '../../components/forms/RHFInput';
import Button from '../../components/buttons/Button';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as clientAPI from '../../app/apis/client';
import useUser from '../../app/hooks/useUser';
import {useNavigation} from '@react-navigation/native';

export interface UpdateUserInput {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

const UpdateUserSchema = yup.object().shape({
  name: yup.string().min(3, '최소 3글자 이상').max(20, '최대 20글자 미만'),
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .email('이메일 형식으로 입력해주세요'),
});

const UpdatePwSchema = yup.object().shape({
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

function UpdateUser() {
  const {user, setUser} = useUser();
  const [pwChangeMode, setPwChangeMode] = React.useState(false);

  const navigation = useNavigation();
  const {handleSubmit, control} = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      pwChangeMode ? UpdateUserSchema.concat(UpdatePwSchema) : UpdateUserSchema,
    ),
    defaultValues: user,
  });

  const handlers = {
    onSubmit: async (uploadData: any) => {
      delete uploadData.passwordChk;
      delete uploadData.createdAt;
      delete uploadData.money;
      delete uploadData.role;

      const {data} = await clientAPI.editUser(uploadData);
      if (!data?.ok) return Alert.alert('회원 정보 변경 오류', data?.error);

      setUser({
        ...user,
        ...uploadData,
      });

      Alert.alert('변경 성공', '회원 정보 변경 성공 🎉');

      navigation.navigate('Setting', {screen: 'Profile'});
    },
    onPressCancel: () => {
      navigation.navigate('Setting', {screen: 'Profile'});
    },
    onPressPwChangeBtn: () => {
      setPwChangeMode(v => !v);
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
        <RHFInput control={control} name="name" label="가입자명" />
      </View>
      <View style={styled.contentWrapper}>
        <RHFInput control={control} name="email" label="로그인 이메일" />
      </View>

      <View style={styled.contentWrapper}>
        <Button
          label={`비밀번호 변경${pwChangeMode ? ' 취소' : ''}`}
          onPress={handlers.onPressPwChangeBtn}
          btnStyle={[
            styled.pwChangeBtn,
            ...(pwChangeMode ? [styled.pwCancelBtn] : []),
          ]}
        />
      </View>

      {pwChangeMode && (
        <>
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
        </>
      )}

      <View style={styled.buttonWrapper}>
        <Button
          label="변경 취소"
          onPress={handlers.onPressCancel}
          btnStyle={styled.loginBtn}
        />
        <Button
          label="회원정보변경"
          onPress={handleSubmit(handlers.onSubmit)}
          btnStyle={styled.loginBtn}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default UpdateUser;

const styled = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 30,
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
  pwChangeBtn: {backgroundColor: '#FF8551'},
  pwCancelBtn: {backgroundColor: 'grey'},
});
