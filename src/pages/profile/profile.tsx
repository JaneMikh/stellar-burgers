import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUserState, getUserinfo } from '../../services/slices/user-slice';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';
import {
  getUserData,
  updateUserData
} from '../../services/actions/userActions';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const [isFormChanged, setIsFormChanged] = useState(false);

  const dispatch = useDispatch();

  const userData: TUser | null = useSelector(getUserinfo);
  const { request } = useSelector(getUserState);

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

  useEffect(() => {
    setIsFormChanged(
      formValue.name !== user.name ||
        formValue.email !== user.email ||
        !!formValue.password
    );
  }, [formValue, user]);

  if (request) {
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
