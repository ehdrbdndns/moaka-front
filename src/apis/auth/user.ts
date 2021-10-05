import axios from 'axios';
import { BASE_URL } from '../utils';
import {
  setUserResponse,
  updateUserRequest,
  updateUserResponse,
} from './types';

export const setUser = async (): Promise<setUserResponse> => {
  let result: setUserResponse = {
    no: 0,
    id: '',
    name: '',
    profile: '',
    category: [],
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/setUserFromToken', null, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      result = response.data;
      result.isSuccess = true;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const updateUser = async (
  userInfo: updateUserRequest,
): Promise<updateUserResponse> => {
  let result: updateUserResponse = {
    isSuccess: false,
    error: 0,
    token: '',
    profile: '',
  };

  const formData = new FormData();

  userInfo.profileFile && formData.append('profileFile', userInfo.profileFile);
  formData.append(
    'user',
    new Blob([JSON.stringify(userInfo.info)], {
      type: 'application/json',
    }),
  );

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/updateUserInfo', formData, {
      headers: {
        Bearer: token,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
      result.token = response.data.token;
      result.profile = response.data.profile;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
