import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {format} from 'date-fns';
import * as clientAPI from '../../../../app/apis/client';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SettingLinks} from '../SettingRoutes';
import useAuth from '../../../../app/hooks/useAuth';
import useUser from '../../../../app/hooks/useUser';
import RButton from '../../../../components/buttons/RButton';

function Profile() {
  const navigation = useNavigation<NavigationProp<SettingLinks>>();
  const {token, setLogout} = useAuth();
  const {user, setUser} = useUser();
  const [updateAt, setUpdateAt] = useState<string>();

  const handlers = {
    linkToUpdate: () => {
      navigation.navigate('Setting', {
        screen: 'Update',
      });
    },
  };

  useEffect(() => {
    const getProfile = async () => {
      const {data} = await clientAPI.myProfile();
      if (!data?.ok) return Alert.alert('통신에러', data?.error);
      setUpdateAt(format(new Date(), 'yyyy년 MM월 dd일 HH:mm 기준'));
      return setUser(data.result);
    };

    getProfile();
  }, [token, setLogout, setUser]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.contentWrapper}>
        {/* 프로필 */}
        <View style={styles.cardWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.textLabel}>가입자명</Text>
            <Text style={styles.textValue}>{user.name}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textLabel}>메일</Text>
            <Text style={styles.textValue}>{user.email}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textLabel}>권한</Text>
            <Text style={styles.textValue}>{user.role}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textLabel}>가입일자</Text>
            <Text style={styles.textValue}>
              {format(new Date(user.createdAt), 'yyyy년 MM월 dd일')}
            </Text>
          </View>
        </View>
        {/* 보유캐시 */}
        <View style={styles.moneyCardWrapper}>
          <View>
            <Text style={styles.moneyTextTitle}>보유 캐시</Text>
          </View>
          <View>
            <Text style={styles.moneyTextValue}>
              {user?.money?.toLocaleString() ?? 0} 원
            </Text>
          </View>
          <View>
            <Text style={styles.moneyTextMemo}>{updateAt}</Text>
          </View>
        </View>
        {/* 버튼 */}
        <View style={styles.buttonWrapper}>
          <RButton
            label="회원 정보 수정"
            onPress={handlers.linkToUpdate}
            btnStyle={styles.updateBtn}
          />
          <RButton label="로그아웃 " onPress={setLogout} />
        </View>
        <View style={styles.buttonWrapper}>
          <RButton
            label="회원 탈퇴 😭"
            onPress={handlers.linkToUpdate}
            btnStyle={styles.cancelBtn}
          />
        </View>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  // 컨텐츠 스타일
  pageWrapper: {
    flex: 1,
    gap: 10,
    padding: 20,
  },
  contentWrapper: {
    flex: 1,
    gap: 20,
  },
  cardWrapper: {
    borderColor: '#9BABB830',
    borderWidth: 2,
    gap: 10,
    padding: 15,
    paddingVertical: 45,
    borderRadius: 22,
  },
  textWrapper: {flexDirection: 'row', alignItems: 'center'},
  textLabel: {
    minWidth: 100,
    fontSize: 15,
    fontWeight: '600',
  },
  textValue: {fontSize: 18},

  // 잔액 스타일
  moneyCardWrapper: {
    borderColor: '#9BABB830',
    borderWidth: 2,
    gap: 10,
    padding: 15,
    paddingVertical: 45,
    borderRadius: 22,
  },
  moneyTextTitle: {fontWeight: '800', fontSize: 21},
  moneyTextValue: {fontWeight: '900', fontSize: 29},
  moneyTextMemo: {fontWeight: '400', fontSize: 13, color: 'grey'},
  buttonWrapper: {
    flexDirection: 'row',

    gap: 10,
  },
  updateBtn: {backgroundColor: '#526D82'},
  cancelBtn: {backgroundColor: '#F24C3D'},
});
