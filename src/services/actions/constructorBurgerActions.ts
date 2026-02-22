import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk('user/getOrder', orderBurgerApi);
