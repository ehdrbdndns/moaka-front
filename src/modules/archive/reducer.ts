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
    case type.DELETE_ARCHIVE:
    case type.INSERT_ARCHIVE:
      return {
        ...state,
        loading: true,
        data: [...state.data],
        error: null,
      };
    case type.SET_LIKE:
    case type.DELETE_LIKE: {
      const archive_index = state.data.findIndex(
        archive => (archive.no = action.payload.archive_no),
      );

      const _data = [...state.data];
      _data[archive_index].like_loading = true;

      return {
        ...state,
        data: _data,
      };
    }
    case type.DELETE_BOOKMARK:
    case type.SET_BOOKMARK: {
      const archive_index = state.data.findIndex(
        archive => (archive.no = action.payload.archive_no),
      );

      const _data = [...state.data];
      _data[archive_index].bookmark_loading = true;

      return {
        ...state,
        data: _data,
      };
    }
    case type.GET_GROUP_ARCHIVE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.INSERT_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case type.GET_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.DELETE_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data.filter(archive => archive.no !== action.payload)],
      };
    case type.SET_LIKE_SUCCESS:
    case type.DELETE_LIKE_SUCCESS: {
      const archive_index = state.data.findIndex(
        archive => (archive.no = action.payload.archive_no),
      );

      const _data = [...state.data];
      _data[archive_index].like_loading = false;
      _data[archive_index].like_no = action.payload.like_no;

      return {
        ...state,
        data: _data,
      };
    }
    case type.SET_BOOKMARK_SUCCESS:
    case type.DELETE_BOOKMARK_SUCCESS: {
      const archive_index = state.data.findIndex(
        archive => (archive.no = action.payload.archive_no),
      );

      const _data = [...state.data];
      _data[archive_index].bookmark_loading = false;
      _data[archive_index].bookmark_no = action.payload.bookmark_no;

      return {
        ...state,
        data: _data,
      };
    }
    case type.GET_GROUP_ARCHIVE_LIST_ERROR:
    case type.GET_ARCHIVE_ERROR:
    case type.DELETE_ARCHIVE_ERROR:
    case type.SET_LIKE_ERROR:
    case type.DELETE_LIKE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
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
