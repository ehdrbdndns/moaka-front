import axios from 'axios';
import { BASE_URL } from '../utils';
import { setUserResponse } from './types';

export const setUser = async (): Promise<setUserResponse> => {
  let result: setUserResponse = {
    no: 0,
    id: '',
    name: '',
    profile: '',
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
