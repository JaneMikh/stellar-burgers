import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getOrder } from '../../services/actions/constructorBurgerActions';
import { getUserState } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import {
  constructorItemsSelector,
  constructorModalDataSelector,
  constructorRequestSelector,
  resetOrderModal,
  setRequest
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(constructorItemsSelector);
  const orderRequest: boolean = useSelector(constructorRequestSelector);
  const orderModalData: TOrder | null = useSelector(
    constructorModalDataSelector
  );
  const { isAuthenticated } = useSelector(getUserState);

  // Создаем массив из id нгредиентов
  let arr: string[] = [];
  const ingredientsList: string[] | void = constructorItems.ingredients.map(
    (item) => item._id
  );

  // Добавляем id булки в массив с ингредиентами
  if (constructorItems.bun) {
    const bun = constructorItems.bun._id;
    arr = [bun, ...ingredientsList, bun];
  }

  const onOrderClick = () => {
    if (constructorItems.bun && isAuthenticated) {
      dispatch(setRequest(true));
      dispatch(getOrder(arr));
    } else if (!constructorItems.bun && isAuthenticated) {
      return;
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
