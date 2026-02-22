import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const getFeedsList = createAsyncThunk('feed/all', getFeedsApi);
