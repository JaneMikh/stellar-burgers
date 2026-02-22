import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useState, useEffect } from 'react';
import { TIngredient } from '@utils-types';
import { useNavigate } from 'react-router-dom';
import { getItemsSelector } from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(getItemsSelector);
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    if (id && ingredientData.length > 0) {
      const findItem = ingredientData.find((item) => item._id === id);
      if (findItem) {
        setIngredient(findItem);
      } else {
        navigate('/404');
      }
    }
    setIsLoading(false);
  }, [id, navigate, ingredientData]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
