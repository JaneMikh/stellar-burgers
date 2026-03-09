import { expect, describe, test } from '@jest/globals';
import {
  getUserData,
  updateUserData,
  getOrdersList,
  registerUser,
  loginUser,
  logoutUser
} from '../actions/userActions';
import { userReducer, initialState } from './user-slice';
import { TOrder, TUser, TUserState } from '../../utils/types';

const mockUser: TUser = {
  email: 'example@mail.ru',
  name: 'Иванов Иван'
};

const mockOrder: TOrder = {
  _id: 'adb-100',
  status: 'done',
  name: 'A delicious burger',
  createdAt: '2026-03-08T00:00:00Z',
  updatedAt: '2026-03-08T00:00:00Z',
  number: 100100,
  ingredients: ['bun', 'main', 'sauce']
};

describe('userSlice reducer', () => {
  describe('Тестирование экшена getUserData', () => {
    test('Тестирование экшена getUserData.pending', () => {
      const action = {
        type: getUserData.pending.type,
        payload: null
      };

      const actualState = userReducer(initialState, action);
      expect(actualState).toEqual({
        ...initialState,
        isAuthChecked: false,
        error: null
      });
    });

    test('Тестирование экшена getUserData.rejected', () => {
      const action = {
        type: getUserData.rejected.type,
        error: { message: 'Ошибка при получении данных пользователя' }
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false,
          error: null
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        isAuthChecked: true,
        error: action.error.message
      };
      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена getUserData.fullfilled', () => {
      const action = {
        type: getUserData.fulfilled.type,
        payload: { user: mockUser }
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false,
          isAuthenticated: false,
          user: null,
          error: null
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: action.payload.user,
        error: null
      };

      expect(actualState).toMatchObject(expectedState);
    });
  });

  describe('Тестирование экшена updateUserData', () => {
    test('Тестирование updateUserData.pending', () => {
      const action = {
        type: updateUserData.pending.type,
        payload: null
      };

      const actualState = userReducer(initialState, action);

      expect(actualState).toEqual({
        ...initialState,
        request: true,
        error: null
      });
    });

    test('Тестирование экшена updateUserData.rejected', () => {
      const action = {
        type: updateUserData.rejected.type,
        error: { message: 'Ошибка при обновлении данных пользователя' }
      };

      const actualState = userReducer(
        {
          ...initialState,
          request: true,
          error: null
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        request: false,
        error: action.error.message
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена updateUserData.fullfilled', () => {
      const newUserData: TUser = {
        email: 'example2@mail.ru',
        name: 'Иванов Иван Иванович'
      };

      const action = {
        type: updateUserData.fulfilled.type,
        payload: { user: newUserData }
      };

      const actualState = userReducer(
        {
          ...initialState,
          request: true,
          error: null,
          responseData: mockUser
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        request: false,
        error: null,
        responseData: action.payload.user
      };

      expect(actualState).toMatchObject(expectedState);
      expect(actualState.responseData).toBe(newUserData);
    });
  });

  describe('Тестирование экшена getOrdersList', () => {
    test('Тестирование экшена getOrdersList.pending', () => {
      const action = {
        type: getOrdersList.pending.type,
        payload: null
      };

      const actualState = userReducer(initialState, action);

      expect(actualState).toEqual({
        ...initialState,
        request: true,
        error: null
      });
    });

    test('Тестирование экшена getOrdersList.rejected', () => {
      const action = {
        type: getOrdersList.rejected.type,
        error: { message: 'Ошибка при получении заказов пользователя' }
      };

      const actualState = userReducer(
        {
          ...initialState,
          request: true,
          error: null
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        request: false,
        error: action.error.message
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена getOrdersList.fullfilled', () => {
      const action = {
        type: getOrdersList.fulfilled.type,
        payload: [mockOrder]
      };

      const actualState = userReducer(
        {
          ...initialState,
          request: true,
          userOrders: []
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        request: false,
        userOrders: action.payload
      };

      expect(actualState).toMatchObject(expectedState);
    });
  });

  describe('Тестирование registerUser', () => {
    test('Тестирование registerUser.pending', () => {
      const action = {
        type: registerUser.pending.type,
        payload: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          request: false,
          isAuthChecked: false,
          isAuthenticated: false
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: null,
        request: true,
        isAuthChecked: false,
        isAuthenticated: false
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка при регистрации пользователя' }
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          request: true,
          isAuthChecked: false
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: action.error.message,
        request: false,
        isAuthChecked: true
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена registerUser.fullfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          request: true,
          responseData: action.payload.user,
          user: action.payload.user,
          isAuthChecked: false,
          isAuthenticated: false
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: null,
        request: false,
        responseData: action.payload.user,
        user: action.payload.user,
        isAuthenticated: true,
        isAuthChecked: true
      };

      expect(actualState).toMatchObject(expectedState);
      expect(actualState.responseData).toBe(action.payload.user);
    });
  });

  describe('Тестирование экшена loginUser', () => {
    test('Тестирование экшена loginUser.pending', () => {
      const action = {
        type: loginUser.pending.type,
        payload: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          isAuthenticated: false,
          isAuthChecked: false,
          loginRequest: false
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: null,
        isAuthenticated: false,
        isAuthChecked: true,
        loginRequest: true
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка при регистрации пользователя' }
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          loginRequest: true,
          isAuthChecked: true
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: action.error.message,
        loginRequest: false,
        isAuthChecked: false
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена loginUser.fullfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          loginRequest: true,
          user: null,
          isAuthenticated: false,
          isAuthChecked: true
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: null,
        loginRequest: false,
        user: action.payload.user,
        isAuthenticated: true,
        isAuthChecked: true
      };

      expect(actualState).toMatchObject(expectedState);
    });
  });

  describe('Тестирование logoutUser', () => {
    test('Тестирование экшена logoutUser.pending', () => {
      const action = {
        type: logoutUser.pending.type,
        payload: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          user: mockUser,
          error: null,
          request: false,
          isAuthenticated: false,
          isAuthChecked: false
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        user: mockUser,
        error: null,
        request: true,
        isAuthChecked: true,
        isAuthenticated: false
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена logoutUser.rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'Ошибка при выходе из личного кабинета' }
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: null,
          request: true,
          isAuthChecked: true,
          isAuthenticated: false
        },
        action
      );
      const expectedState: TUserState = {
        ...actualState,
        error: action.error.message,
        request: false,
        isAuthChecked: false,
        isAuthenticated: true
      };

      expect(actualState).toMatchObject(expectedState);
    });

    test('Тестирование экшена logoutUser.fullfilled', () => {
      const action = {
        type: logoutUser.fulfilled.type,
        payload: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          user: mockUser,
          error: null,
          request: true,
          isAuthenticated: true
        },
        action
      );

      const expectedState: TUserState = {
        ...actualState,
        error: null,
        user: null,
        request: false,
        isAuthenticated: false
      };

      expect(actualState).toMatchObject(expectedState);
    });
  });
});
