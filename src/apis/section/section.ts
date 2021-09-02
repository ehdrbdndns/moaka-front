import axios from 'axios';
import { chunkInfo, sectionInfo } from '../../modules/section/types';
import { BASE_URL } from '../utils';
import {
  deleteChunkResponseByAxios,
  deleteSectionResponseByAxios,
  getSectionResponseByAxios,
  makeChunkResponseByAxios,
  makeSectionResponseByAxios,
  updateChunkResponseByAxios,
  updateSectionResponseByAxios,
} from './types';

export const getSection = async (
  archive_no: number,
): Promise<getSectionResponseByAxios> => {
  const result: getSectionResponseByAxios = {
    isSuccess: false,
    error: 0,
    section_list: [],
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/getSection',
      {
        archive_no,
      },
      {
        headers: {
          Bearer: token,
        },
      },
    )
    .then(function (response) {
      result.isSuccess = true;
      result.section_list = response.data;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const makeSection = async (
  sectionInfo: sectionInfo,
): Promise<makeSectionResponseByAxios> => {
  const result: makeSectionResponseByAxios = {
    isSuccess: false,
    section_no: 0,
    error: 0,
  };
  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/insertSection', sectionInfo, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      result.isSuccess = true;
      result.section_no = response.data.section_no;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const deleteSection = async (
  section_no: number,
): Promise<deleteSectionResponseByAxios> => {
  const result: deleteSectionResponseByAxios = {
    isSuccess: false,
    error: 0,
  };
  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/deleteSection',
      {
        no: section_no,
      },
      {
        headers: {
          Bearer: token,
        },
      },
    )
    .then(function (response) {
      result.isSuccess = true;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const updateSection = async (
  sectionInfo: sectionInfo,
): Promise<updateSectionResponseByAxios> => {
  const result: updateSectionResponseByAxios = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/updateSection', sectionInfo, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      result.isSuccess = true;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

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
