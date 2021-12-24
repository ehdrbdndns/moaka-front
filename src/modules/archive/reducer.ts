import { AnyAction } from 'redux';
import * as type from './types';

function archive(
  state: type.initialState = type.initialArchiveState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.GET_GROUP_ARCHIVE_LIST:
    case type.GET_BOOKMARK_ARCHIVE_LIST:
    case type.GET_TOP_ARCHIVE_LIST:
    case type.GET_CATEGORY_ARCHIVE_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.INSERT_STORE_ARCHIVE:
      return {
        ...state,
      };
    case type.GET_HOME_ARCHIVE_LIST:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case type.GET_ARCHIVE:
    case type.SEARCH_ARCHIVE:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case type.DELETE_ARCHIVE:
    case type.INSERT_ARCHIVE:
    case type.UPDATE_ARCHIVE:
      return {
        ...state,
        loading: true,
        data: [...state.data],
        error: null,
      };
    case type.SET_LIKE:
    case type.DELETE_LIKE: {
      const archive_index = state.data.findIndex(
        archive => archive.no === action.payload.archive_no,
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
        archive => archive.no === action.payload.archive_no,
      );

      const _data = [...state.data];
      _data[archive_index].bookmark_loading = true;

      return {
        ...state,
        data: _data,
      };
    }
    case type.RESET_ARCHIVE:
      return {
        ...state,
      };
    case type.GET_GROUP_ARCHIVE_LIST_SUCCESS:
    case type.GET_BOOKMARK_ARCHIVE_LIST_SUCCESS:
    case type.GET_TOP_ARCHIVE_LIST_SUCCESS:
    case type.GET_CATEGORY_ARCHIVE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case type.INSERT_STORE_ARCHIVE_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case type.GET_HOME_ARCHIVE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.INSERT_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case type.UPDATE_ARCHIVE_SUCCESS:
      const archive_index = state.data.findIndex(
        archive => (archive.no = action.payload.no),
      );
      const _data = [...state.data];
      _data[archive_index] = {
        ..._data[archive_index],
        no: action.payload.no,
        title: action.payload.title,
        description: action.payload.description,
        tag_list: action.payload.tag_list,
        privacy_type: action.payload.privacy_type,
        thumbnail: action.payload.thumbnail,
        category: action.payload.category,
      };
      return {
        ...state,
        loading: false,
        data: _data,
      };
    case type.GET_ARCHIVE_SUCCESS:
    case type.SEARCH_ARCHIVE_SUCCESS:
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
    case type.SET_LIKE_SUCCESS: {
      const archive_index = state.data.findIndex(
        archive => archive.no === action.payload.archive_no,
      );

      const _data = [...state.data];
      _data[archive_index].like_loading = false;
      _data[archive_index].like_no = action.payload.like_no;
      _data[archive_index].like_count += 1;

      return {
        ...state,
        data: _data,
      };
    }
    case type.DELETE_LIKE_SUCCESS: {
      const archive_index = state.data.findIndex(
        archive => archive.no === action.payload.archive_no,
      );

      const _data = [...state.data];
      _data[archive_index].like_loading = false;
      _data[archive_index].like_no = action.payload.like_no;
      _data[archive_index].like_count -= 1;

      return {
        ...state,
        data: _data,
      };
    }
    case type.SET_BOOKMARK_SUCCESS:
    case type.DELETE_BOOKMARK_SUCCESS: {
      const archive_index = state.data.findIndex(
        archive => archive.no === action.payload.archive_no,
      );

      const _data = [...state.data];
      _data[archive_index].bookmark_loading = false;
      _data[archive_index].bookmark_no = action.payload.bookmark_no;

      return {
        ...state,
        data: _data,
      };
    }
    case type.RESET_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [],
      };
    case type.INSERT_STORE_ARCHIVE_ERROR:
    case type.GET_BOOKMARK_ARCHIVE_LIST_ERROR:
    case type.GET_TOP_ARCHIVE_LIST_ERROR:
    case type.GET_CATEGORY_ARCHIVE_LIST_ERROR:
    case type.GET_HOME_ARCHIVE_LIST_ERROR:
    case type.GET_GROUP_ARCHIVE_LIST_ERROR:
    case type.GET_ARCHIVE_ERROR:
    case type.DELETE_ARCHIVE_ERROR:
    case type.SET_LIKE_ERROR:
    case type.DELETE_LIKE_ERROR:
    case type.SEARCH_ARCHIVE_ERROR:
    case type.UPDATE_ARCHIVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.EXPIRE_JWT_TOKEN: {
      return {
        ...state,
        loading: false,
        error: '403',
      };
    }
    default:
      return state;
  }
}

export default archive;
