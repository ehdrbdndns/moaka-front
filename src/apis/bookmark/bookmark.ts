import axios from 'axios';
import { BASE_URL } from '../utils';
import { deleteBookmarkResponse, insertBookmarkOfChunkResponse } from './types';

export const insertBookmarkOfChunk = async (
  chunk_no: number,
): Promise<insertBookmarkOfChunkResponse> => {
  const result: insertBookmarkOfChunkResponse = {
    isSuccess: false,
    error: 0,
    bookmark_no: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/insertBookmarkOfChunk',
      {
        chunk_no,
      },
      {
        headers: {
          Bearer: token,
        },
      },
    )
    .then(function (response) {
      result.isSuccess = true;
      result.bookmark_no = response.data.bookmark_no;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const deleteBookmarkOfChunk = async (
  bookmark_no: number,
): Promise<deleteBookmarkResponse> => {
  const result: deleteBookmarkResponse = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/deleteBookmark',
      {
        no: bookmark_no,
      },
      {
        headers: {
          Bearer: token,
        },
      },
    )
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
