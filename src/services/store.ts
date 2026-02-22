import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientReducer } from './slices/ingredients-slice';
import { constructorReducer } from './slices/constructor-slice';
import { orderReducer } from './slices/order-slice';

//Корневой редюсер
const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  constructorBurger: constructorReducer,
  order: orderReducer
});

//Создание хранинлища
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

//Тизация состояния хранища и диспатча
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//Типизация хуков
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
