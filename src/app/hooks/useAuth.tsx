import {useCallback, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  initialState as initialTokenState,
  setToken as setStoreToken,
} from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initialState as initialUserState,
  setUser,
} from '../store/slices/userSlice';

function useAuth() {
  const dispatch = useDispatch();
  const token = useSelector<RootState>(state => state?.auth?.token);

  const setToken = useCallback(
    async (token: string) => {
      await EncryptedStorage.setItem('token', token);

      dispatch(
        setStoreToken({
          token,
        }),
      );
    },
    [dispatch],
  );

  const setLogout = useCallback(() => {
    // 토큰 정보 삭제
    EncryptedStorage.clear();

    // 유저 정보 삭제
    AsyncStorage.clear();

    dispatch(setStoreToken(initialTokenState));
    dispatch(setUser(initialUserState));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      // 리덕스 x
      if (!token) {
        const storageToken = await EncryptedStorage.getItem('token');
        // 스토리지 x
        if (!storageToken) {
          return;
        }
        setToken(storageToken);
      }
    })();
  }, [token, dispatch, setToken]);

  return {
    token,
    setToken,
    setLogout,
  };
}

export default useAuth;
