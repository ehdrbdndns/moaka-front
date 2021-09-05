import axios from 'axios';
import { BASE_URL } from '../utils';
import { chunkInfo } from '../../modules/section';
import {
  deleteChunkResponseByAxios,
  makeChunkResponseByAxios,
  updateChunkResponseByAxios,
} from './types';

export const deleteChunk = async (
  chunk_no: number,
): Promise<deleteChunkResponseByAxios> => {
  const result: deleteChunkResponseByAxios = {
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
): Promise<makeChunkResponseByAxios> => {
  const result: makeChunkResponseByAxios = {
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

export const updateChunk = async (
  chunk_info: chunkInfo,
): Promise<updateChunkResponseByAxios> => {
  const result: updateChunkResponseByAxios = {
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
