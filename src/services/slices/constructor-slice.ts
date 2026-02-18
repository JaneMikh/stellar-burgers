import { orderBurgerApi } from '@api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

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

export const getOrder = createAsyncThunk('user/getOrder', orderBurgerApi);

const constructorSlice = createSlice({
  name: 'constructorOfBurger',
  initialState,
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
        console.log(id)
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
    }
    /*setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    }*/
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
        console.log(action.payload);
      });
  }
});

export const constructorItemsSelector = (state: RootState) =>
  state.constructorBurger.constructorItems;

export const constructorModalDataSelector = (state: RootState) =>
  state.constructorBurger.orderModalData;

export const constructorRequestSelector = (state: RootState) =>
  state.constructorBurger.orderRequest;

export const {
  addItem,
  removeItem,
  resetConstructor,
  resetOrderModal
  //setOrderRequest
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
