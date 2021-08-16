import axios from 'axios';
import { BASE_URL } from '../utils';
import { DirectoryResponseByAxios } from './types';

export const getLocalDirectory = async (
  user_no: number,
): Promise<DirectoryResponseByAxios> => {
  let directoryInfo: DirectoryResponseByAxios = [];
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
