import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface UserStoreType {
  name: string;
  email: string;
  token: string;
  money: number;
}

export const initialState: UserStoreType = {
  name: '',
  email: '',
  token: '',
  money: 0,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStoreType>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.money = action.payload.money;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
