import { FC } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { getUserState } from '../../services/slices/user-slice';
import { getOrdersList } from '../../services/actions/userActions';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const { request, userOrders } = useSelector(getUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
