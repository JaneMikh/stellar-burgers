import { expect, describe, test } from '@jest/globals';
import { feedReducer } from './feed-slice';
import { getFeedsList } from '../actions/feedActions';
import { TFeedState, TOrder } from '../../utils/types';

describe('Feed-slice reducer', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  const mockFirstOrder: TOrder = {
    _id: 'adb-100',
    status: 'done',
    name: 'A delicious burger',
    createdAt: '2026-03-08T00:00:00Z',
    updatedAt: '2026-03-08T00:00:00Z',
    number: 100100,
    ingredients: ['bun', 'main', 'sauce']
  };

  const mockSecondOrder: TOrder = {
    _id: 'adb-101',
    status: 'done',
    name: 'Not a delicious burger',
    createdAt: '2026-03-08T00:00:00Z',
    updatedAt: '2026-03-08T00:00:00Z',
    number: 100101,
    ingredients: ['bun', 'main', 'sauce']
  };

  const mockOrders = {
    orders: [mockFirstOrder, mockSecondOrder],
    total: 100,
    totalToday: 20
  };

  test('Тестирование асинхронного экшена getFeedsList.pending', async () => {
    const action = {
      type: getFeedsList.pending.type,
      payload: null
    };

    const actualState = feedReducer(initialState, action);
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('Тестирование асинхронного экшена getFeedsList.rejected', async () => {
    const action = {
      type: getFeedsList.rejected.type,
      error: { message: 'Ошибка при получении списка заказов' }
    };

    const expectedState: TFeedState = {
      ...initialState,
      isLoading: false,
      error: action.error.message
    };

    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true,
        error: null
      },
      action
    );
    expect(actualState).toMatchObject(expectedState);
  });

  test('Тестирование асинхронного экшена getFeedsList.fullfilled', async () => {
    const action = {
      type: getFeedsList.fulfilled.type,
      payload: { success: true, ...mockOrders }
    };

    const expectedState: TFeedState = {
      orders: [mockFirstOrder, mockSecondOrder],
      total: 100,
      totalToday: 20,
      isLoading: false,
      error: null
    };

    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true,
        error: null
      },
      action
    );
    expect(actualState).toMatchObject(expectedState);
  });
});
