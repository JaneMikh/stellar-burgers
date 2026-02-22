// Тип для ингредиента в каталоге
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

// Тип для ингредиента в конструкторе бургера
export type TConstructorIngredient = TIngredient & {
  id: string;
};

// Тип для заказа
export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

// Тип для списка заказов
export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

// Тип для авторизованного пользователя
export type TUser = {
  email: string;
  name: string;
};

// Тип для управлением работы "Tabs"
export type TTabMode = 'bun' | 'sauce' | 'main';

// Тип для состояния ингредиента
export type TIngredientState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
};

// Тип для состояния конструктора
export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

// Тип для состояния заказа
export type TOrderState = {
  orders: TOrder[];
  request: boolean;
  responseOrder: null;
  getOrderResponse: TOrder | null;
  error: string | null;
};

// Тип для корневого состояния (дополнить!!!)
export type RootState = {
  ingredients: TIngredientState;
  constructorBurger: TConstructorState;
};

// Тип для состояния ленты заказов
export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};
