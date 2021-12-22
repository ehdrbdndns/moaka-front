import axios from 'axios';
import { archiveInfo } from '../../modules/archive';
import { BASE_URL } from '../utils';
import {
  deleteArchiveResponse,
  getArchiveResponse,
  getBookmarkArchiveListResponse,
  getGroupArchiveListResponse,
  getTopArchiveListResponse,
  insertArchiveRequest,
  insertArchiveResponse,
  getArchiveBySearchResponse,
  getCategoryArchiveResponse,
  updateArchiveRequest,
  updateArchiveResponse,
} from './types';

export const insertArchive = async (
  insertArchiveRequest: insertArchiveRequest,
): Promise<insertArchiveResponse> => {
  const result: insertArchiveResponse = {
    isSuccess: false,
    error: 0,
    archive: {} as archiveInfo,
  };

  const formData = new FormData();

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
      result.archive.type = 'group';
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const updateArchive = async (
  updateArchiveRequest: updateArchiveRequest,
): Promise<updateArchiveResponse> => {
  const result: updateArchiveResponse = {
    isSuccess: false,
    error: 0,
    thumbnail: '',
  };

  const formData = new FormData();

  updateArchiveRequest.thumbnailFile &&
    formData.append('thumbnailFile', updateArchiveRequest.thumbnailFile);

  formData.append(
    'archive',
    new Blob([JSON.stringify(updateArchiveRequest.info)], {
      type: 'application/json',
    }),
  );

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/updateArchive', formData, {
      headers: {
        Bearer: token,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
      result.thumbnail = response.data.thumbnail;
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
      .post(BASE_URL + '/user/retrieveArchiveOfGroupByUserNo', null, {
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

export const getBookmarkArchiveList =
  async (): Promise<getBookmarkArchiveListResponse> => {
    const result: getBookmarkArchiveListResponse = {
      isSuccess: false,
      error: 0,
      archive_list: [],
    };

    const token = localStorage.getItem('token');
    await axios
      .post(BASE_URL + '/user/retrieveArchiveOfBookmarkByUserNo', null, {
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

export const getTopArchiveList =
  async (): Promise<getTopArchiveListResponse> => {
    const result: getTopArchiveListResponse = {
      isSuccess: false,
      error: 0,
      archive_list: [],
    };

    const token = localStorage.getItem('token');
    await axios
      .post(BASE_URL + '/retrieveArchiveOfTop', null, {
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

export const retrieveArchiveBySearch = async (
  param: string,
): Promise<getArchiveBySearchResponse> => {
  const result: getArchiveBySearchResponse = {
    isSuccess: false,
    error: 0,
    archive_list: [],
  };

  const formData = new FormData();
  formData.append('p', '%' + param + '%');

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/retrieveArchiveBySearch', formData, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
      result.archive_list = response.data.archive_list;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const getCategoryArchiveList =
  async (): Promise<getCategoryArchiveResponse> => {
    const result: getCategoryArchiveResponse = {
      isSuccess: false,
      error: 0,
      archive_list: [],
    };

    try {
      const token = localStorage.getItem('token');
      await axios
        .post(BASE_URL + '/retrieveArchiveOfCategory', null, {
          headers: {
            Bearer: token,
          },
        })
        .then(function (response) {
          result.isSuccess = response.data.isSuccess;
          result.archive_list = response.data.archive_list;
        })
        .catch(function (error) {
          console.log(error.response);
          result.isSuccess = false;
          result.error = error.response.status;
        });
    } catch (error) {
      console.log(error);
    }

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
    archive: {} as archiveInfo,
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
