import axios from 'axios';
import { BASE_URL } from '../utils';
import {
  deleteBookmarkResponse,
  insertBookmarkOfArchiveResponse,
  insertBookmarkOfChunkResponse,
  linkPreviewResponse,
} from './types';

export const linkPreview = async (
  link: string,
): Promise<linkPreviewResponse> => {
  let result: linkPreviewResponse = {} as linkPreviewResponse;

  await axios
    .post(BASE_URL + '/linkPreview', null, {
      params: {
        link,
      },
    })
    .then(function (response) {
      result = response.data;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error);
      result.error = error.response.status;
      result.favicon = '/img/logo/logo.png';
      result.link = link;
      // eslint-disable-next-line no-useless-escape
      result.domain = link.toString().replace(/^(.*\/\/[^\/?#]*).*$/, '$1');
      result.description = '';
    });

  return result;
};

export const insertBookmarkOfArchive = async (
  archive_no: number,
): Promise<insertBookmarkOfArchiveResponse> => {
  const result: insertBookmarkOfArchiveResponse = {
    isSuccess: false,
    error: 0,
    bookmark_no: 0,
  };

  const token = localStorage.getItem('token');
  await axios
    .post(
      BASE_URL + '/user/insertBookmarkOfArchive',
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
      result.bookmark_no = response.data.bookmark_no;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};

export const deleteBookmarkOfArchive = async (
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
