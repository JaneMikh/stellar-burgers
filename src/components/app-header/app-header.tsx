import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserState).user;

  return <AppHeaderUI userName={userData?.name} />;
};
