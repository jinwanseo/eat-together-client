import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import infoSlice from './slices/infoSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    info: infoSlice,
    auth: authSlice,
    user: userSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
