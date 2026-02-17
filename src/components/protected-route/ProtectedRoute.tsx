import { ReactElement } from 'react';

type ProtectedRouteProps = {
  children: ReactElement;
  isAuthorized: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuthorized
}: ProtectedRouteProps) =>
  //Дописать логику
  children;
