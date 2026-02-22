import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredientState } from '@utils-types';
import { getIngredients } from '../actions/ingredients';

const initialState: TIngredientState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getItemsSelector: (state) => state.ingredients,
    getItemsState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isIngredientsLoading = false;
          state.ingredients = action.payload;
          state.error = null;
        }
      );
  }
});

export const { getItemsSelector, getItemsState } = ingredientSlice.selectors;
export const ingredientReducer = ingredientSlice.reducer;
