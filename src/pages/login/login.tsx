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
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getUserState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (password && email) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          if (isAuthenticated) {
            return <Navigate to='/' />;
          }
        })
        .catch((err) => setError(err));
    }

    if (!email || !password) {
      return;
    }
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
