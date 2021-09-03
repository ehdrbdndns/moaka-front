import axios from 'axios';
import { BASE_URL } from '../utils';
import { deleteLikeResponse, insertLikeOfChunkResponse } from './types';

export const insertLikeOfChunk = async (
  chunk_no: number,
): Promise<insertLikeOfChunkResponse> => {
  const result: insertLikeOfChunkResponse = {
    isSuccess: false,
    error: 0,
    like_no: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/insertLikeOfChunk',
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
      result.like_no = response.data.like_no;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const deleteLike = async (
  like_no: number,
): Promise<deleteLikeResponse> => {
  const result: deleteLikeResponse = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/deleteLike',
      {
        no: like_no,
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
