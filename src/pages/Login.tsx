import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackLinks} from '../app/routes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as loginAPI from '../app/apis/login';
function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigation: NavigationProp<RootStackLinks> = useNavigation();

  const handlers = {
    onPressLogin: async () => {
      if (!email || !password)
        return Alert.alert('입력 오류', '모든 데이터 입력');
      const {data} = await loginAPI.loginUser({email, password});
      console.log(data);
    },
    onPressJoin: () => {
      navigation.navigate('Join');
    },
  };
  return (
    <KeyboardAwareScrollView style={styled.container}>
      <View style={styled.contentWrapper}>
        <TextInput
          value={email}
          style={styled.input}
          placeholder="로그인 아이디"
          onChangeText={data => setEmail(data)}
        />
      </View>
      <View style={styled.contentWrapper}>
        <TextInput
          value={password}
          style={styled.input}
          placeholder="로그인 비밀번호"
          onChangeText={data => setPassword(data)}
        />
      </View>
      <View style={styled.buttonWrapper}>
        <Pressable
          style={styled.loginBtnWrapper}
          onPress={handlers.onPressLogin}>
          <Text style={styled.buttonText}>로그인</Text>
        </Pressable>
        <Pressable style={styled.joinBtnWrapper} onPress={handlers.onPressJoin}>
          <Text style={styled.buttonText}>회원가입</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styled = StyleSheet.create({
  container: {marginVertical: 130},
  contentWrapper: {
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 25,
    fontWeight: '600',
  },
  input: {
    fontSize: 21,

    color: 'grey',
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 30,
    gap: 10,
  },
  loginBtnWrapper: {
    flex: 1,
    backgroundColor: '#4F709C',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 15,
  },
  joinBtnWrapper: {
    flex: 1,
    backgroundColor: '#FF8551',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 21,
    color: '#FAF0E4',
  },
});

export default Login;
