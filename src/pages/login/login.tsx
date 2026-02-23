import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { getUserState } from '../../services/slices/user-slice';
import { loginUser } from '../../services/actions/userActions';
import { useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(getUserState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (password && email) {
      dispatch(loginUser({ email, password }));
    }

    if (!email || !password) {
      return;
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
