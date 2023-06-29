import {createSlice} from '@reduxjs/toolkit';

export interface LocationType {
  name: string;
  latitude: string;
  longitude: string;
}

export interface IOrder {
  id: number;
  pay: number;
  start: LocationType;
  end: LocationType;
  state: string;
  client?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderSlice {
  orderList: IOrder[];
}

export const initialState: OrderSlice = {
  orderList: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderList: (state, action: {payload: IOrder[]}) => {
      state.orderList = action.payload;
    },
  },
});

export const {setOrderList} = orderSlice.actions;
export default orderSlice.reducer;
