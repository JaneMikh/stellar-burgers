import { expect, describe, test } from '@jest/globals';
import { initialState, orderReducer } from './order-slice';
import { getOrderNumber } from '../actions/orderActions';
import { TOrder } from '../../utils/types';

const mockOrder: TOrder = {
  _id: '111',
  status: 'done',
  name: 'Tasty burger',
  createdAt: '2026-03-07T00:00:00Z',
  updatedAt: '2026-03-07T00:00:00Z',
  number: 100100,
  ingredients: ['bun', 'main', 'sauce']
};

describe('OrderSlice reducer', () => {
  test('Тестирование состояния при pending', async () => {
    const action = {
      type: getOrderNumber.pending.type,
      payload: null
    }
    const state = orderReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBe(null);
    expect(state.getOrderResponse).toBe(null);
  });

  test('Тестирование состояния при fullfiled', async () => {
   const action = {
    type: getOrderNumber.fulfilled.type,
    payload: { orders: [mockOrder] }
   }
    const state = orderReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe(null);
    expect(state.getOrderResponse).toEqual(mockOrder);
  });

  test('Тестирование состояния при rejected', async () => {
    const action = {
      type: getOrderNumber.rejected.type,
      error: { message: 'Ошибка при получении номера заказа'}
    }
    const state = orderReducer(initialState, action);
    expect(state.request).toBe(false);
    expect(state.error).toBe(action.error.message);
    expect(state.getOrderResponse).toBe(null);
  });
});
