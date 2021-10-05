import * as sagaType from './types';

// TODO 액션 함수
export const searchUserList = (id: string) => ({
  type: sagaType.SEARCH_USERLIST,
  payload: id,
});
