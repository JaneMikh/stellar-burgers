import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk('user/getOrder', orderBurgerApi);
