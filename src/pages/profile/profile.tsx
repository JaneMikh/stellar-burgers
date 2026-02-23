import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from '../../services/store';
import {
  getUserData,
  updateUserData
} from '../../services/actions/userActions';
import { getUserState } from '../../services/slices/user-slice';
import { useDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const [isFormChanged, setIsFormChanged] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(getUserState).user;
  const isLoading = useSelector(getUserState).request;

  const user = {
    name: userData?.name || '',
    email: userData?.email || ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    if (userData) {
      setFormValue({
        name: userData.name || '',
        email: userData.email || '',
        password: ''
      });
    }
  }, [userData]);

  /*const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;
*/
  useEffect(() => {
    setIsFormChanged(
      formValue.name !== user.name ||
        formValue.email !== user.email ||
        !!formValue.password
    );
  }, [formValue, user]);

  if (isLoading) {
    return <Preloader />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserData(formValue))
      .unwrap()
      .then(() => {
        setIsFormChanged(false);
        setFormValue({ ...formValue, password: '' });
        dispatch(getUserData());
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
    setIsFormChanged(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
