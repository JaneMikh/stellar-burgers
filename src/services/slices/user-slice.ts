import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TUserState } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUserData,
  logoutUser,
  updateUserData,
  getOrdersList,
  registerUser,
  loginUser
} from '../actions/userActions';

const initialState: TUserState = {
  user: null,
  userOrders: [],
  responseData: null,
  request: false,
  error: null,
  registerData: null,
  loginRequest: false,
  isAuthChecked: false,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUserState: (state) => state,
    getUserinfo: (state) => state.user
  },
  extraReducers: (builder) => {
    builder //Получение данных пользователя  +++++++
      .addCase(getUserData.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = null;
      }) //Обновление данных пользователья (авторизованного) ++++
      .addCase(updateUserData.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.responseData = action.payload.user;
      }) //Получение данных о заказах +++++
      .addCase(getOrdersList.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(
        getOrdersList.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.error = null;
          state.request = false;
          state.userOrders = action.payload;
        }
      ) //Регистрация пользователя +++
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.request = true;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.responseData = action.payload.user;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      }) //Оправка не сервер данных: почта и пароль +++
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.loginRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthChecked = false;
        state.loginRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginRequest = false;
      }) //Выход из личного кабинета +++++
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.request = true;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.request = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export const { getUserState, getUserinfo } = userSlice.selectors;
export const userReducer = userSlice.reducer;
