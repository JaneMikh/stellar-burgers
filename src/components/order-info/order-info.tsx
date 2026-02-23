import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import { getOrderState } from '../../services/slices/order-slice';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderNumber } from '../../services/actions/orderActions';
import { getItemsSelector } from '../../services/slices/ingredients-slice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  /* const orderData = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  };
  const ingredients: TIngredient[] = [];*/

  const dispatch = useDispatch();
  const { request, getOrderResponse } = useSelector(getOrderState);
  const number = Number(useParams().number);

  useEffect(() => {
    dispatch(getOrderNumber(number));
  }, []);

  const ingredients: TIngredient[] = useSelector(getItemsSelector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!getOrderResponse || !ingredients.length) return null;

    const date = new Date(getOrderResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = getOrderResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...getOrderResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [getOrderResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
