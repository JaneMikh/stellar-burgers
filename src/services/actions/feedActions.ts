import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeedsList = createAsyncThunk('feed/all', getFeedsApi);
