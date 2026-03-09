import { expect, describe, test } from '@jest/globals';
import { ingredientReducer, initialState } from './ingredients-slice';
import { getIngredients } from '../actions/ingredientsActions';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
  }
];

describe('IngredietsSlice reducer', () => {
  test('Тестирование состояния загрузки при pending', () => {
    const action = {
      type: getIngredients.pending.type,
      payload: null
    };
    const state = ingredientReducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тестирование состояния загрузки при rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: getIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientReducer(
      {
        ...initialState,
        isIngredientsLoading: true
      },
      action
    );
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тестирование состояния загрузки при fullfiled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientReducer(
      {
        ...initialState,
        isIngredientsLoading: true
      },
      action
    );
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(mockIngredients);
  });
});
