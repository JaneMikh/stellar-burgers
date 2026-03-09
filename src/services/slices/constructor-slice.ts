import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TConstructorState } from '@utils-types';
import { getOrder } from '../actions/constructorBurgerActions';

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    constructorItemsSelector: (state) => state.constructorItems,
    constructorModalDataSelector: (state) => state.orderModalData,
    constructorRequestSelector: (state) => state.orderRequest
  },
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    resetConstructor: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
      state.orderModalData = null;
    },
    resetOrderModal: (state) => {
      state.orderModalData = null;
    },
    setRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    moveItemDown: (state, action: PayloadAction<string>) => {
      const itemIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex < state.constructorItems.ingredients.length - 1) {
        [
          state.constructorItems.ingredients[itemIndex],
          state.constructorItems.ingredients[itemIndex + 1]
        ] = [
          state.constructorItems.ingredients[itemIndex + 1],
          state.constructorItems.ingredients[itemIndex]
        ];
      }
    },
    moveItemUp: (state, action: PayloadAction<string>) => {
      const itemIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex > 0) {
        [
          state.constructorItems.ingredients[itemIndex],
          state.constructorItems.ingredients[itemIndex - 1]
        ] = [
          state.constructorItems.ingredients[itemIndex - 1],
          state.constructorItems.ingredients[itemIndex]
        ];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const {
  addItem,
  removeItem,
  resetConstructor,
  resetOrderModal,
  moveItemDown,
  moveItemUp,
  setRequest
} = constructorSlice.actions;

export const {
  constructorItemsSelector,
  constructorModalDataSelector,
  constructorRequestSelector
} = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
