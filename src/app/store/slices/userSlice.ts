import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface UserSlice {
  name: string;
  email: string;
  role: string;
  money: number;
  createdAt: string;
}

export const initialState: UserSlice = {
  name: '',
  email: '',
  role: '',
  money: 0,
  createdAt: '',
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSlice>) => {
      const {name, email, role, money, createdAt} = action.payload;

      state.name = name;
      state.email = email;
      state.role = role;
      state.money = money;
      state.createdAt = createdAt;
    },
    setMoney: (state, action: PayloadAction<number>) => {
      state.money = action.payload;
    },
  },
});

export const {setUser, setMoney} = userSlice.actions;
export default userSlice.reducer;
