import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type IngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};
const initialState: IngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getItemsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
          state.error = null;
        }
      );
  }
});

export const { getItemsSelector } = ingredientSlice.selectors;
export const ingredientReducer = ingredientSlice.reducer;
