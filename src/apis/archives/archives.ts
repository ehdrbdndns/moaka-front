import axios from 'axios';
import { BASE_URL } from '../utils';
import {
  deleteArchiveResponse,
  getArchiveResponse,
  getGroupArchiveListResponse,
  insertArchiveRequest,
  insertArchiveResponse,
} from './types';

export const insertArchive = async (
  insertArchiveRequest: insertArchiveRequest,
): Promise<insertArchiveResponse> => {
  const result: insertArchiveResponse = {
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

  const formData = new FormData();
  console.log('test');
  console.log(JSON.stringify(insertArchiveRequest.info));

  formData.append('thumbnailFile', insertArchiveRequest.thumbnailFile);
  formData.append(
    'archive',
    new Blob([JSON.stringify(insertArchiveRequest.info)], {
      type: 'application/json',
    }),
  );

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/insertArchive', formData, {
      headers: {
        Bearer: token,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
      result.archive = response.data.archive;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

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

export const deleteArchive = async (
  archive_no: number,
): Promise<deleteArchiveResponse> => {
  const result: deleteArchiveResponse = {
    isSuccess: false,
    error: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/deleteArchiveFromArchiveNo', null, {
      params: {
        archive_no,
      },
      headers: {
        Bearer: token,
      },
    })
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
