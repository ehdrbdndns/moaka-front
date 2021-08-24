import axios from 'axios';
import { sectionInfo } from '../../modules/section/types';
import { BASE_URL } from '../utils';
import {
  deleteSectionResponseByAxios,
  makeSectionResponseByAxios,
} from './types';

export const makeSection = async (
  sectionInfo: sectionInfo,
): Promise<makeSectionResponseByAxios> => {
  const result: makeSectionResponseByAxios = {
    isSuccess: false,
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
