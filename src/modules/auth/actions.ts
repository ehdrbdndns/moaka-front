import { LoginInfo } from '../../apis/auth/types';
import * as sagaType from './types';

// TODO 액션 함수
export const getLocalLogin = (loginInfo: LoginInfo) => ({
  type: sagaType.GET_LOCAL_LOGIN,
  payload: loginInfo,
});
export const getGoogleLogin = (userInfo: sagaType.googleUserInfo) => ({
  type: sagaType.GET_GOOGLE_LOGIN,
  payload: userInfo,
});
export const getLogout = () => ({
  type: sagaType.GET_LOGOUT,
});
export const getIsLogin = () => ({
  type: sagaType.GET_ISLOGIN,
});
export const getRegister = (localRegisterInfo: sagaType.localRegisterInfo) => ({
  type: sagaType.GET_REGISTER,
  payload: localRegisterInfo,
});
export const setUser = () => ({
  type: sagaType.SET_USER,
});
