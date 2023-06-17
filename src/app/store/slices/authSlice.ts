import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface AuthStoreType {
  token: string;
}

export const initialState: AuthStoreType = {
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthStoreType>) => {
      state.token = action.payload.token;
    },
  },
});

export const {setToken} = authSlice.actions;
export default authSlice.reducer;
