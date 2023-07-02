import {PayloadAction, createSlice} from '@reduxjs/toolkit';

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
  acceptList: IOrder[];
}

export const initialState: OrderSlice = {
  orderList: [],
  acceptList: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // 주문 리스트
    setOrderList: (state, action: PayloadAction<IOrder[]>) => {
      state.orderList = action.payload;
    },
    // 주문 (수락) 리스트
    setAcceptList: (state, action: PayloadAction<IOrder[]>) => {
      state.acceptList = action.payload;
    },
  },
});

export const {setOrderList, setAcceptList} = orderSlice.actions;
export default orderSlice.reducer;
