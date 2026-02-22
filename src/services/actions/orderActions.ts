import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderNumber = createAsyncThunk(
  'order/createOrder',
  async (data: number) => getOrderByNumberApi(data)
);
