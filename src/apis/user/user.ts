import axios from 'axios';
import { BASE_URL } from '../utils';
import { DirectoryResponse, searchUserListResponse } from './types';

export const getLocalDirectory = async (
  user_no: number,
): Promise<DirectoryResponse> => {
  let directoryInfo: DirectoryResponse = [];
  await axios
    .post(BASE_URL + '/retrieveLocalDirectory', null, {
      params: {
        user_no: user_no,
      },
    })
    .then(function (response) {
      directoryInfo = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return directoryInfo;
};

export const searchUserList = async (
  id: string,
): Promise<searchUserListResponse> => {
  let result: searchUserListResponse = {
    isSuccess: false,
    user_list: [],
    error: 0,
  };

  await axios
    .post(BASE_URL + '/retrieveUserListById', null, {
      params: {
        id: id,
      },
    })
    .then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
