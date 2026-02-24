import { ReactElement } from 'react';
import { Preloader } from '@ui';
import { getUserState } from '../../services/slices/user-slice';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUserData } from '../../services/actions/userActions';
import { setAuthChecked } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  children: ReactElement;
  isAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuthorized
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthChecked, user } = useSelector(getUserState);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token && !user && !isAuthChecked) {
      dispatch(getUserData())
        .unwrap()
        .catch(() => {
          dispatch(setAuthChecked(true));
        });
    } else if (!token && !isAuthChecked) {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch, isAuthChecked, user]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isAuthorized && isAuthenticated) {
    const current = location.state?.from || { pathname: '/' };
    return <Navigate replace to={current} />;
  }

  if (!isAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
