import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import infoSlice from './slices/infoSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    info: infoSlice,
    auth: authSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
