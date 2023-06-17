import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface InfoSlice {
  currentPage: string;
}

export const initialState: InfoSlice = {
  currentPage: '',
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {setCurrentPage} = infoSlice.actions;
export default infoSlice.reducer;
