import {useEffect, useState} from 'react';

import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {
  setUser as setReduxUser,
  UserStoreType,
} from '../store/slices/userSlice';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const user: UserStoreType = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const setUser = async (userInfo: UserStoreType): Promise<void> => {
    await EncryptedStorage.setItem('name', userInfo.name);
    await EncryptedStorage.setItem('email', userInfo.email);
    await EncryptedStorage.setItem('token', userInfo.token);
    await EncryptedStorage.setItem('money', userInfo.money + '');
    dispatch(
      setReduxUser({
        name: userInfo.name,
        email: userInfo.email,
        token: userInfo.token,
        money: userInfo.money,
      }),
    );
    setIsLoggedIn(true);
  };
  const setLogout = async () => {
    await EncryptedStorage.clear();
    setIsLoggedIn(false);
    dispatch(
      setReduxUser({
        name: '',
        email: '',
        token: '',
        money: 0,
      }),
    );
  };

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      // 리덕스 저장 x
      if (!user.token) {
        const token = (await EncryptedStorage.getItem('token')) ?? '';

        // 스토리지 x
        if (!token) {
          return setIsLoggedIn(false);
        }
        // 스토리지 o
        else {
          const name = (await EncryptedStorage.getItem('name')) ?? '';
          const email = (await EncryptedStorage.getItem('email')) ?? '';
          const money = +JSON.stringify(
            (await EncryptedStorage.getItem('money')) ?? 0,
          );
          const newUser: UserStoreType = {
            name,
            email,
            token,
            money,
          };
          dispatch(setReduxUser(newUser));
        }
      } else {
        setIsLoggedIn(true);
      }
    };
    getUser();
  }, [dispatch, user]);

  return {
    user,
    isLoggedIn,
    setUser,
    setLogout,
  };
}

export default useAuth;
