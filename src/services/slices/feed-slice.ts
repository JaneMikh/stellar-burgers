import { createSlice } from '@reduxjs/toolkit';
import { TFeedState } from '@utils-types';
import { getFeedsList } from '../actions/feedActions';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedInfo: (state) => state,
    getOrderInfo: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getFeedsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      });
  }
});

export const { getFeedInfo, getOrderInfo } = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
