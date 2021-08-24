import axios from 'axios';
import { sectionInfo } from '../../modules/section/types';
import { BASE_URL } from '../utils';
import {
  deleteSectionResponseByAxios,
  getSectionResponseByAxios,
  makeSectionResponseByAxios,
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
      console.log(response);
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
      console.log(response);
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
      console.log(response);
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
      console.log(response);
      result.isSuccess = true;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });
  return result;
};
