import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  getOrdersApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

// Получить данные пользователя (name, email) +
export const getUserData = createAsyncThunk('user/getData', getUserApi);

//Обновить данные пользователя (email, name, password)+
export const updateUserData = createAsyncThunk(
  'user/updateData',
  updateUserApi
);

//Получить данные с информацией о заказах, сделанных авторизованным пользователем +
export const getOrdersList = createAsyncThunk('user/orders', getOrdersApi);

//Запрос на регистрацию пользователя +
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData); //Данные пользователя (пароль, почта и имя передаются в registerUserApi)
    if (!data.success) {
      return data;
    }
    //В случае успеха добавляем токен в локальное хранилище
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

//Оправка не сервер данных: почта и пароль +
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    if (!data.success) {
      return data;
    }
    //В случае успеха добавляем токен в локальное хранилище
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

// Отправка запроса на сервер для выхода из личного кабинета +
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});
