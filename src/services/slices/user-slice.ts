import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TUserState } from '@utils-types';
import {
  getUserData,
  logoutUser,
  updateUserData,
  getOrdersList,
  registerUser,
  loginUser
} from '../actions/userActions';
import { PayloadAction } from '@reduxjs/toolkit';

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
    resetError: (state) => {
      state.error = null;
    },
    loginOut: (state) => {
      state.user = null;
    }
  },
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder //Получение данных пользователя
      .addCase(getUserData.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      }) //Обновление данных пользователья (авторизованного)
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
      }) //Получение данных о заказах
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
      ) //Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.request = true;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.responseData = action.payload.user;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = false;
      }) //Оправка не сервер данных: почта и пароль
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
      }) //Выход из личного кабинета
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
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = null;
        state.request = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      });
  }
});

export const { getUserState } = userSlice.selectors;
export const { resetError, loginOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
