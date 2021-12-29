import axios from 'axios';
import { BASE_URL } from '../utils';
import { retrieveChatByRoomNoResponse } from './types';

export const retrieveChatByRoomNo = async (
  roomNo: number,
): Promise<retrieveChatByRoomNoResponse> => {
  let result = {} as retrieveChatByRoomNoResponse;

  await axios
    .post(BASE_URL + '/retrieveChatByRoomNo', null, {
      params: {
        roomNo,
      },
    })
    .then(function (response) {
      result.chat_list = response.data.chat_list;
      result.isSuccess = true;
      result.error = 0;
    })
    .catch(function (error) {
      result.chat_list = [];
      result.isSuccess = false;
      result.error = error.response.status;
    });

  return result;
};
