import axios from 'axios';
import { BASE_URL } from '../utils';
import { chunkInfo, relativeChunkInfo } from '../../modules/section';
import {
  deleteChunkResponse,
  makeChunkResponse,
  makeRelativeChunkResponse,
  updateChunkResponse,
} from './types';

export const deleteChunk = async (
  chunk_no: number,
): Promise<deleteChunkResponse> => {
  const result: deleteChunkResponse = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/deleteChunk',
      {
        no: chunk_no,
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

export const makeChunk = async (
  chunk_info: chunkInfo,
): Promise<makeChunkResponse> => {
  const result: makeChunkResponse = {
    isSuccess: false,
    error: 0,
    no: 0,
    regdate: '',
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/insertChunk', chunk_info, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      // TODO 해당 청크를 추가할 권한이 없는 계정인 경우 false
      result.isSuccess = response.data.isSuccess;
      result.no = response.data.no;
      result.regdate = response.data.regdate;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const makeRelativeChunk = async (
  relative_chunk_info: relativeChunkInfo,
): Promise<makeRelativeChunkResponse> => {
  const result: makeRelativeChunkResponse = {
    isSuccess: false,
    error: 0,
    no: 0,
    regdate: '',
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/insertRelativeChunk', relative_chunk_info, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      // TODO 해당 청크를 추가할 권한이 없는 계정인 경우 false
      result.isSuccess = response.data.isSuccess;
      result.no = response.data.no;
      result.regdate = response.data.regdate;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const updateChunk = async (
  chunk_info: chunkInfo,
): Promise<updateChunkResponse> => {
  const result: updateChunkResponse = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/updateChunk', chunk_info, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      // TODO 해당 청크를 추가할 권한이 없는 계정인 경우 false
      result.isSuccess = response.data.isSuccess;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
