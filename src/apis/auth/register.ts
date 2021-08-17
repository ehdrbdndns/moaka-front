import axios from 'axios';
import { googleUserInfo, userInfo } from '../../modules/auth';
import { BASE_URL } from '../utils';
import { googleRegisterInfo, RegisterResponseByAxios } from './types';

export const googleRegister = async (
  googleUserInfo: googleUserInfo,
): Promise<RegisterResponseByAxios> => {
  let result: RegisterResponseByAxios = {
    no: 0,
    isSuccess: false,
    error: null,
  };
  await axios
    .post(BASE_URL + '/register', null, {
      params: {
        sub: googleUserInfo.sub,
        id: googleUserInfo.id,
        name: googleUserInfo.name,
        profile: googleUserInfo.profile,
        auth_type: googleUserInfo.auth_type,
      },
    })
    .then(function (response) {
      const responseData: RegisterResponseByAxios = response.data;
      result = {
        ...result,
        ...responseData,
      };
    })
    .catch(function (error) {
      console.log(error);
      result = {
        ...result,
        error: error.message,
      };
    });
  return result;
};
