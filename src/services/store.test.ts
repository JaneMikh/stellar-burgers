import { expect, describe, test } from '@jest/globals';
import store, { rootReducer } from './store';

test('Тестирование rootReducer', () => {
  const expected = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(expected).toEqual(store.getState());
});
