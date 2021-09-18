import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '../components/Register/RegisterForm';
import { RootState } from '../modules';
import { getRegister, localRegisterInfo } from '../modules/auth';
import {
  expireRegisterMailCode,
  insertRegisterMailCode,
  mailState,
  sendRegisterMailCode,
} from '../modules/mail';

function Register() {
  const dispatch = useDispatch();
  const registerInfo = useSelector((state: RootState) => state.auth);
  const mailInfo = useSelector((state: RootState) => state.mail);

  const localRegister = (localRegisterInfo: localRegisterInfo) => {
    dispatch(getRegister(localRegisterInfo));
  };

  const insertRegisterMailCodeRedux = (mailState: mailState) => {
    dispatch(insertRegisterMailCode(mailState));
  };

  const expireRegisterMailCodeRedux = useCallback(
    (mail_no: number) => {
      dispatch(expireRegisterMailCode(mail_no));
    },
    [dispatch],
  );

  const sendRegisterMailCodeRedux = (mailState: mailState) => {
    dispatch(sendRegisterMailCode(mailState));
  };

  return (
    <>
      <RegisterForm
        loading={registerInfo.loading}
        error={registerInfo.error}
        mailInfo={mailInfo}
        localRegister={localRegister}
        insertRegisterMailCodeRedux={insertRegisterMailCodeRedux}
        expireRegisterMailCodeRedux={expireRegisterMailCodeRedux}
        sendRegisterMailCodeRedux={sendRegisterMailCodeRedux}
      ></RegisterForm>
    </>
  );
}

export default Register;
