import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '../components/Register/RegisterForm';
import { RootState } from '../modules';
import { getRegister, localRegisterInfo } from '../modules/auth';

function Register() {
  const dispatch = useDispatch();
  const registerInfo = useSelector((state: RootState) => state.auth);

  const localRegister = (localRegisterInfo: localRegisterInfo) => {
    dispatch(getRegister(localRegisterInfo));
  };

  return (
    <>
      <RegisterForm
        loading={registerInfo.loading}
        error={registerInfo.error}
        localRegister={localRegister}
      ></RegisterForm>
    </>
  );
}

export default Register;
