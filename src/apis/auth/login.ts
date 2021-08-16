import { LoginInfo, LoginResponseByAxios } from './types';
import axios from 'axios';
import { BASE_URL } from '../utils';

// const sleep = (n: number) => new Promise(resolve => setTimeout(resolve, n));

export const googleLogin = async (
  sub: string,
): Promise<LoginResponseByAxios> => {
  let result: LoginResponseByAxios = {
    isLogin: false,
    token: '',
    error: null,
  };
  await axios
    .post(BASE_URL + '/login', null, {
      params: {
        sub: sub,
        auth_type: 'google',
      },
    })
    .then(function (response) {
      const responseData: LoginResponseByAxios = response.data;
      result = {
        ...result,
        ...responseData,
      };
    })
    .catch(function (error) {
      console.log(error);
      result = {
        ...result,
        error: error,
      };
    });
  return result;
};

export const localLogin = async (
  loginInfo: LoginInfo,
): Promise<LoginResponseByAxios> => {
  let result: LoginResponseByAxios = {
    isLogin: false,
    token: '',
    error: null,
  };
  await axios
    .post(BASE_URL + '/login', null, {
      params: {
        id: loginInfo.id,
        pwd: loginInfo.pwd,
        auth_type: 'local',
      },
    })
    .then(function (response) {
      const responseData: LoginResponseByAxios = response.data;
      result = {
        ...result,
        ...responseData,
      };
    })
    .catch(function (error) {
      console.log(error);
      result = {
        ...result,
        error: error,
      };
    });
  return result;
};
