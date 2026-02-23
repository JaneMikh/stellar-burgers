import { ReactElement } from 'react';
import { Preloader } from '@ui';
import { getUserState } from '../../services/slices/user-slice';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactElement;
  isAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuthorized
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthChecked } = useSelector(getUserState);

  const location = useLocation();

  if (!isAuthenticated && !isAuthorized) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuthenticated && isAuthorized) {
    const current = location.state?.from || { pathname: '/' };
    return <Navigate replace to={current} />;
  }

  if (!isAuthChecked) {
    return <Preloader />;
  }

  return children ? children : <Outlet />;
};
