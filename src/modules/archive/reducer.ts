import { AnyAction } from 'redux';
import * as type from './types';

function archive(
  state: type.initialState = type.initialArchiveState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.GET_GROUP_ARCHIVE_LIST:
      return {
        ...state,
        loading: true,
        data: [...state.data],
        error: null,
      };
    case type.GET_ARCHIVE:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case type.GET_GROUP_ARCHIVE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.GET_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.GET_GROUP_ARCHIVE_LIST_ERROR:
    case type.GET_ARCHIVE_ERROR: {
      alert('에러: ' + action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case type.EXPIRE_JWT_TOKEN: {
      return {
        ...state,
        loading: false,
        error: '404',
      };
    }
    default:
      return state;
  }
}

export default archive;
