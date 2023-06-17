import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../components/buttons/Button';

import useAuth from '../app/hooks/useAuth';
import useUser from '../app/hooks/useUser';
import {format} from 'date-fns';

function Setting() {
  const {setLogout} = useAuth();
  const {user} = useUser();

  const handlers = {
    linkToUpdate: () => {},
  };

  useEffect(() => {
    if (!user) {
      setLogout();
    }
  }, [user, setLogout]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.contentWrapper}>
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

        <View style={styles.moneyCardWrapper}>
          <View>
            <Text style={styles.moneyTextTitle}>보유 잔액</Text>
          </View>
          <View>
            <Text style={styles.moneyTextValue}>100,000 원</Text>
          </View>
          <View>
            <Text style={styles.moneyTextMemo}>
              2023년 06월 18일 12:38 기준
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          label="회원 정보 수정"
          onPress={handlers.linkToUpdate}
          btnStyle={{backgroundColor: '#526D82'}}
        />
        <Button label="로그아웃 " onPress={setLogout} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          label="회원 탈퇴 😭"
          onPress={handlers.linkToUpdate}
          btnStyle={{backgroundColor: '#F24C3D'}}
        />
      </View>
    </View>
  );
}

export default Setting;

const styles = StyleSheet.create({
  // 컨텐츠 스타일
  pageWrapper: {
    flex: 1,
    gap: 10,
    padding: 30,
  },
  contentWrapper: {
    flex: 1,
    gap: 20,
  },
  cardWrapper: {
    borderColor: '#9BABB830',
    borderWidth: 2,
    gap: 30,
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
});
