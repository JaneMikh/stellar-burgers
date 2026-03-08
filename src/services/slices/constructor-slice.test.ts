import { expect, describe, test } from '@jest/globals';
import {
  constructorReducer,
  addItem,
  removeItem,
  moveItemDown,
  moveItemUp,
  initialState
} from './constructor-slice';
import { TIngredient } from '../../utils/types';

const mockFirstBun: TIngredient = {
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
};

const mockSecondBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockMain: TIngredient = {
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
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0945',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

describe('constructorSlice reducer', () => {
  describe('Тестирование addItem', () => {
    const expectedIngredientsList = {
      ...initialState,
      constrictorItems: {
        bun: mockFirstBun,
        ingredients: [mockMain, mockSauce]
      }
    };

    test('Тест на добавление ингредиента в конструктор', () => {
      const newConstructorState = constructorReducer(
        initialState,
        addItem(mockMain)
      );

      const currentIngredient =
        newConstructorState.constructorItems.ingredients[0];
      const expectedIngredient =
        expectedIngredientsList.constrictorItems.ingredients[0];

      expect(currentIngredient).toEqual({
        ...expectedIngredient,
        id: expect.any(String) //При добавлении ингредиента в конструктор ему присвается дополнительный id
      });
    });

    test('Тест на добавление булки в конструктор', () => {
      const newConstructorState = constructorReducer(
        initialState,
        addItem(mockFirstBun)
      );
      const currentBun = newConstructorState.constructorItems.bun;
      const expectedBun = expectedIngredientsList.constrictorItems.bun;

      expect(currentBun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });

    test('Тест на замену булок в конструкторе после добавления', () => {
      const initialConstructorState = {
        ...initialState,
        constuctorItems: {
          bun: mockFirstBun,
          ingredients: []
        }
      };

      const expectedConstructorState = {
        ...initialConstructorState,
        constructorItems: {
          bun: mockSecondBun,
          ingredients: []
        }
      };

      const newSate = constructorReducer(
        initialConstructorState,
        addItem(mockSecondBun)
      );

      const currentBun = newSate.constructorItems.bun;
      const expectedBun = expectedConstructorState.constructorItems.bun;

      expect(currentBun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });
  });

  describe('Удаление ингредиента из конструктора', () => {
    test('Тест на удаление ингредиента', () => {
      const currentConstructorState = {
        ...initialState,
        constructorItems: {
          bun: null,
          ingredients: [{ ...mockMain, id: '1' }]
        }
      };

      const expectedConstructorState = {
        ...currentConstructorState,
        constructorItems: {
          bun: null,
          ingredients: []
        }
      };

      const newConstructorSate = constructorReducer(
        currentConstructorState,
        removeItem('1')
      );

      const currentResult = newConstructorSate.constructorItems.ingredients;
      const expectedResult =
        expectedConstructorState.constructorItems.ingredients;

      expect(currentResult).toEqual(expectedResult);
    });
  });

  describe('Тестирование на изменение порядка ингредиентов', () => {
    const initialConstructorState = {
      ...initialState,
      constructorItems: {
        bun: { ...mockFirstBun, id: '1' },
        ingredients: [
          { ...mockSauce, id: '2' },
          { ...mockMain, id: '3' }
        ]
      }
    };

    const expectedConstructorState = {
      ...initialConstructorState,
      constructorItems: {
        bun: { ...mockFirstBun, id: '1' },
        ingredients: [
          { ...mockMain, id: '3' },
          { ...mockSauce, id: '2' }
        ]
      }
    };

    test('Тест на перемещение ингредиента вверх', () => {
      const newConstructorState = constructorReducer(
        initialConstructorState,
        moveItemUp('3')
      );

      const currentResult = newConstructorState.constructorItems.ingredients;
      const expectedResult =
        expectedConstructorState.constructorItems.ingredients;

      expect(currentResult).toEqual(expectedResult);
    });

    test('Тест на перемещение ингредиента вниз', () => {
      const newConstructorSate = constructorReducer(
        expectedConstructorState,
        moveItemDown('3')
      );

      const currentResult = newConstructorSate.constructorItems.ingredients;
      const expectedResult =
        initialConstructorState.constructorItems.ingredients;

      expect(currentResult).toEqual(expectedResult);
    });
  });
});
