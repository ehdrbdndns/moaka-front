import axios from 'axios';
import { BASE_URL } from '../utils';
import { getArchiveResponse, getGroupArchiveListResponse } from './types';

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

export const getArchive = async (
  archive_no: number,
): Promise<getArchiveResponse> => {
  const result: getArchiveResponse = {
    isSuccess: false,
    error: 0,
    archive: {
      no: 0,
      user_no: 0,
      title: '',
      description: '',
      thumbnail: '',
      creator_name: '',
      privacy_type: '',
      regdate: '',
      tag_list: [],
      bookmark_no: 0,
      bookmark_loading: false,
      like_no: 0,
      like_loading: false,
    },
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/retrieveArchiveFromArchiveNo', null, {
      params: {
        archive_no: archive_no,
      },
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      result.isSuccess = true;
      result.archive = response.data.archive;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
