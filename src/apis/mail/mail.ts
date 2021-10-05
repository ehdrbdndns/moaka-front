import axios from 'axios';
import { BASE_URL } from '../utils';
import {
  expireMailCodeResponse,
  insertMailCodeOfRegisterResponse,
  isExistMailCodeResponse,
} from './types';

export const insertMailCodeOfRegister = async (
  address: string,
): Promise<insertMailCodeOfRegisterResponse> => {
  const result: insertMailCodeOfRegisterResponse = {
    isSuccess: false,
    error: 0,
    no: 0,
  };

  await axios
    .post(BASE_URL + '/insertMailCodeOfRegister', null, {
      params: {
        address: address,
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
      result.no = response.data.no;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};
export const isExistMailCode = async (
  no: number,
  code: number,
): Promise<isExistMailCodeResponse> => {
  const result: isExistMailCodeResponse = {
    isSuccess: false,
    error: 0,
  };

  await axios
    .post(BASE_URL + '/isExistMailCode', null, {
      params: {
        no: no,
        code: code,
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const expireMailCode = async (
  no: number,
): Promise<expireMailCodeResponse> => {
  const result: expireMailCodeResponse = {
    isSuccess: false,
    error: 0,
  };

  await axios
    .post(BASE_URL + '/expireMailCode', null, {
      params: {
        no: no,
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};
