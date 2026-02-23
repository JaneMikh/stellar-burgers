import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useState, useEffect } from 'react';
import { TIngredient } from '@utils-types';
import { useNavigate } from 'react-router-dom';
import { getItemsSelector } from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';
import { getItemsState } from '../../services/slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(getItemsSelector);
  const { error } = useSelector(getItemsState);
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && ingredientData.length > 0) {
      const findItem = ingredientData.find((item) => item._id === id);
      if (findItem) {
        setIngredient(findItem);
      } else {
        navigate('/404');
      }
    }
  }, [id, navigate, ingredientData]);

  if (!ingredient) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
