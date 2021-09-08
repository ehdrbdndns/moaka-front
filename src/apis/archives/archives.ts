import axios from 'axios';
import { BASE_URL } from '../utils';
import { getGroupArchiveListResponse } from './types';

export const getGroupArchiveList =
  async (): Promise<getGroupArchiveListResponse> => {
    const result: getGroupArchiveListResponse = {
      isSuccess: false,
      error: 0,
      archive_list: [],
    };

    const token = localStorage.getItem('token');
    await axios
      .post(BASE_URL + '/user/retrieveArchiveFromGroup', null, {
        headers: {
          Bearer: token,
        },
      })
      .then(function (response) {
        result.isSuccess = true;
        result.archive_list = response.data.archive_list;
      })
      .catch(function (error) {
        console.log(error.response);
        result.isSuccess = false;
        result.error = error.response.status;
      });

    return result;
  };
