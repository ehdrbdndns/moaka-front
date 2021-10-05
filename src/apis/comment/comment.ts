import axios from 'axios';
import { BASE_URL } from '../utils';
import {
  deleteCommentOfChunkResponse,
  insertCommentOfChunkRequest,
  insertCommentOfChunkResponse,
} from './types';

export const insertCommentOfChunk = async (
  content_info: insertCommentOfChunkRequest,
): Promise<insertCommentOfChunkResponse> => {
  const result: insertCommentOfChunkResponse = {
    isSuccess: false,
    error: 0,
    comment_info: null,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/insertCommentOfChunk', content_info, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      // TODO 해당 청크를 삭제할 권한이 없는 계정인 경우 false
      result.isSuccess = response.data.isSuccess;
      result.comment_info = response.data.comment_info;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const deleteCommentOfChunk = async (
  comment_no: number,
): Promise<deleteCommentOfChunkResponse> => {
  const result: deleteCommentOfChunkResponse = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/deleteCommentOfChunk',
      {
        no: comment_no,
      },
      {
        headers: {
          Bearer: token,
        },
      },
    )
    .then(function (response) {
      // TODO 해당 청크를 삭제할 권한이 없는 계정인 경우 false
      result.isSuccess = response.data.isSuccess;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
