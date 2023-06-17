import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSlice, setUser as setStoreUser} from '../store/slices/userSlice';
import {useCallback, useEffect} from 'react';

export default function useUser() {
  const dispatch = useDispatch();
  const user: any = useSelector<RootState>(state => state.user);

  const setUser = useCallback(
    async (user: UserSlice) => {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch(setStoreUser(user));
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      if (!user?.name) {
        const storageUser = await AsyncStorage.getItem('user');
        if (!storageUser) {
          return;
        }
        setUser(JSON.parse(storageUser));
      }
    })();
  }, [setUser, user]);

  return {
    user,
    setUser,
  };
}
