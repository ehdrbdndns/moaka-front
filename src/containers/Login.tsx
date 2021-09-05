import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginInfo } from '../apis/auth/types';
import LoginForm from '../components/Login/LoginForm';
import { RootState } from '../modules';
import { getGoogleLogin, getLocalLogin, googleUserInfo } from '../modules/auth';

function Login() {
  const dispatch = useDispatch();
  const authInfo = useSelector((state: RootState) => state.auth);

  const localLoginRedux = (loginInfo: LoginInfo) => {
    dispatch(getLocalLogin(loginInfo));
  };

  const googleLoginRedux = (googleUserInfo: googleUserInfo) => {
    dispatch(getGoogleLogin(googleUserInfo));
  };

  return (
    <div>
      <LoginForm
        isLoading={authInfo.loading}
        isLogin={authInfo.data.isLogin}
        localLoginRedux={localLoginRedux}
        googleLoginRedux={googleLoginRedux}
      />
    </div>
  );
}

export default Login;
