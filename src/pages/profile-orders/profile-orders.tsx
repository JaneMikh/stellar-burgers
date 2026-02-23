import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { getUserState } from '../../services/slices/user-slice';
import { getOrdersList } from '../../services/actions/userActions';
import { getFeedsList } from '../../services/actions/feedActions';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = useSelector(getUserState).userOrders;
  const { request, userOrders } = useSelector(getUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getFeedsList());
    dispatch(getOrdersList());
    console.log(userOrders);
  }, [dispatch]);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
