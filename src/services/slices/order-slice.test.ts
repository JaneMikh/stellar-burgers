import { expect, describe, test } from '@jest/globals';
import { initialState, orderReducer } from './order-slice';
import { getOrderNumber } from '../actions/orderActions';
import { TOrderResponse } from '../../utils/burger-api';
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

const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [mockOrder]
};

describe('OrderSlice reducer', () => {
  test('Тестирование состояния заказа при pending', async () => {
    const action = {
      type: getOrderNumber.pending.type,
      payload: mockOrder.number
    }
    const state = orderReducer(
     {
      ...initialState,
      request: true
     },
     action
    );

    expect(state.request).toBe(true);
    expect(state.error).toBe(null);
    expect(state.getOrderResponse).toBe(null);
  });

  test('Тестирование состояния заказа при fullfiled', async () => {
    const action = getOrderNumber.fulfilled(mockOrderResponse, 'fullfilled', 100100);
    const state = orderReducer(
      {
      ...initialState,
      request: false,
      error: null,
      },
      action
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe(null);
    expect(state.getOrderResponse).toEqual(mockOrder);
  });

  test('Тестирование состояния заказа при rejected', async () => {
    const action = getOrderNumber.rejected(new Error('error'), 'rejected', 100100);
    const state = orderReducer(
      {
      ...initialState,
      request: false,
      error: null
      },
      action
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe('error');
    expect(state.getOrderResponse).toBe(null);
  });
});

