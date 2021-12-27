import axios from 'axios';
import { BASE_URL } from '../utils';
import {
  DirectoryResponseByAxios,
  retrieveGroupUserOfArchiveByArchiveNoResponse,
  searchUserListResponse,
  searchUserResponse,
} from './types';

export const getLocalDirectory = async (
  user_no: number,
): Promise<DirectoryResponseByAxios> => {
  let directoryInfo: DirectoryResponseByAxios = [];
  await axios
    .post(BASE_URL + '/retrieveLocalDirectory', null, {
      params: {
        user_no: user_no,
      },
    })
    .then(function (response) {
      directoryInfo = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return directoryInfo;
};

export const searchUserList = async (
  id: string,
): Promise<searchUserListResponse> => {
  let result: searchUserListResponse = {
    isSuccess: false,
    user_list: [],
    error: 0,
  };

  await axios
    .post(BASE_URL + '/retrieveUserListById', null, {
      params: {
        id: id,
      },
    })
    .then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const searchUser = async (id: string): Promise<searchUserResponse> => {
  let result = {} as searchUserResponse;

  await axios
    .post(BASE_URL + '/searchUser', null, {
      params: {
        id: id,
      },
    })
    .then(function (response) {
      result = response.data;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};

export const retrieveGroupUserOfArchiveByArchiveNo = async (
  archive_no: number,
): Promise<retrieveGroupUserOfArchiveByArchiveNoResponse> => {
  let result: retrieveGroupUserOfArchiveByArchiveNoResponse = {
    user_list: [],
    isSuccess: false,
    error: 0,
  };

  await axios
    .post(BASE_URL + '/retrieveGroupUserOfArchiveByArchiveNo', null, {
      params: {
        archive_no: archive_no,
      },
    })
    .then(function (response) {
      result.isSuccess = response.data.isSuccess;
      result.user_list = response.data.user_list;
    })
    .catch(function (error) {
      console.log(error);
      result.error = error.response.status;
    });

  return result;
};
