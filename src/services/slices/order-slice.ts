import { createSlice } from '@reduxjs/toolkit';
import { TOrderState } from '@utils-types';
import { getOrderNumber } from '../actions/orderActions';

export const initialState: TOrderState = {
  orders: [],
  request: false,
  responseOrder: null,
  getOrderResponse: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.getOrderResponse = action.payload.orders[0];
        state.request = false;
        state.error = null;
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      });
  }
});

export const { getOrderState } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
