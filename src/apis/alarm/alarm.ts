import axios from 'axios';
import { BASE_URL } from '../utils';
import { retrieveAlarmResponse } from './types';

export const retrieveAlarm = async (): Promise<retrieveAlarmResponse> => {
  const result = {} as retrieveAlarmResponse;

  const token = localStorage.getItem('token');
  await axios
    .post(BASE_URL + '/user/retrieveAlarmByUserNo', null, {
      headers: {
        Bearer: token,
      },
    })
    .then(function (response) {
      // TODO 해당 청크를 추가할 권한이 없는 계정인 경우 false
      result.isSuccess = true;
      result.alarm_list = response.data.alarm_list;
      result.error = 0;
    })
    .catch(function (error) {
      console.log(error.response);
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
