import { AnyAction } from 'redux';
import * as type from './types';

// TODO 리듀서 작성
function userList(
  state: type.initialState = type.initialAuthState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.SEARCH_USERLIST:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case type.SEARCH_USERLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.SEARCH_USERLIST_FAILE:
    case type.SEARCH_USERLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userList;
