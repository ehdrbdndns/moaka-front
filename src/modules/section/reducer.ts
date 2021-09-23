import { AnyAction } from 'redux';
import * as type from './types';

function section(
  state: type.initialState = type.initailSectionState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.GET_SECTION:
    case type.MAKE_SECTION:
    case type.DELETE_SECTION:
    case type.UPDATE_SECTION:
    case type.DELETE_CHUNK:
    case type.MAKE_CHUNK:
    case type.UPDATE_CHUNK:
      return {
        ...state,
        loading: true,
        data: [...state.data],
        error: null,
      };
    case type.MAKE_RELATIVE_CHUNK: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.group_num,
      );

      const _data = [...state.data];
      console.log(_data[section_index].chunk_list[chunk_index]);

      _data[section_index].chunk_list[chunk_index].relative_chunk_loading =
        true;

      return {
        ...state,
        data: _data,
      };
    }
    case type.DELETE_RELATIVE_CHUNK:
      return {
        ...state,
        error: null,
      };
    case type.DELETE_BOOKMARK:
    case type.SET_BOOKMARK: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.chunk_no,
      );
      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index].bookmark_loading = true;
      return {
        ...state,
        data: _data,
      };
    }
    case type.DELETE_LIKE:
    case type.SET_LIKE: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.chunk_no,
      );
      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index].like_loading = true;
      return {
        ...state,
        data: _data,
      };
    }
    case type.UPDATE_SECTION_SUCCESS: {
      const index = state.data.findIndex(
        section => section.no === action.payload.no,
      );

      const _data = [...state.data];
      action.payload.chunk_list = _data[index].chunk_list;
      _data[index] = action.payload;

      return {
        ...state,
        loading: false,
        data: _data,
      };
    }
    case type.MAKE_SECTION_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case type.DELETE_RELATIVE_CHUNK_SUCCESS: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.group_num,
      );

      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index].relative_chunk_list = _data[
        section_index
      ].chunk_list[chunk_index].relative_chunk_list.filter(
        relative_chunk => relative_chunk.no !== action.payload.chunk_no,
      );

      return {
        ...state,
        data: _data,
      };
    }
    case type.DELETE_SECTION_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(section => section.no !== action.payload)],
        loading: false,
      };
    case type.DELETE_CHUNK_SUCCESS: {
      const index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );

      const _data = [...state.data];
      _data[index].chunk_list = _data[index].chunk_list.filter(
        chunk => chunk.no !== action.payload.chunk_no,
      );

      return {
        ...state,
        loading: false,
        data: _data,
      };
    }
    case type.MAKE_CHUNK_SUCCESS: {
      const index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );

      const _data = [...state.data];
      _data[index].chunk_list = [action.payload, ..._data[index].chunk_list];

      return {
        ...state,
        loading: false,
        data: _data,
      };
    }
    case type.MAKE_RELATIVE_CHUNK_SUCCESS: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.group_num,
      );

      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index].relative_chunk_loading =
        false;
      _data[section_index].chunk_list[chunk_index].relative_chunk_list = [
        ..._data[section_index].chunk_list[chunk_index].relative_chunk_list,
        action.payload,
      ];

      return {
        ...state,
        data: _data,
      };
    }
    case type.GET_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.UPDATE_CHUNK_SUCCESS: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.no,
      );

      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index] = action.payload;

      return {
        ...state,
        loading: false,
        data: _data,
      };
    }
    case type.DELETE_BOOKMARK_SUCCESS:
    case type.SET_BOORMARK_SUCCESS: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.chunk_no,
      );

      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index].bookmark_no =
        action.payload.bookmark_no;
      _data[section_index].chunk_list[chunk_index].bookmark_loading = false;

      return {
        ...state,
        data: _data,
      };
    }
    case type.DELETE_LIKE_SUCCESS:
    case type.SET_LIKE_SUCCESS: {
      const section_index = state.data.findIndex(
        section => section.no === action.payload.section_no,
      );
      const chunk_index = state.data[section_index].chunk_list.findIndex(
        chunk => chunk.no === action.payload.chunk_no,
      );

      const _data = [...state.data];
      _data[section_index].chunk_list[chunk_index].like_no =
        action.payload.like_no;
      _data[section_index].chunk_list[chunk_index].like_loading = false;

      return {
        ...state,
        data: _data,
      };
    }
    case type.MAKE_SECTION_ERROR:
    case type.DELETE_SECTION_ERROR:
    case type.GET_SECTION_ERROR:
    case type.UPDATE_SECTION_ERROR:
    case type.DELETE_CHUNK_ERROR:
    case type.DELETE_CHUNK_NOAUTH:
    case type.DELETE_RELATIVE_CHUNK_ERROR:
    case type.DELETE_RELATIVE_CHUNK_NOAUTH:
    case type.MAKE_CHUNK_ERROR:
    case type.MAKE_CHUNK_NOAUTH:
    case type.MAKE_RELATIVE_CHUNK_ERROR:
    case type.MAKE_RELATIVE_CHUNK_NOAUTH:
    case type.SET_BOOKMARK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.EXPIRE_JWT_TOKEN:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default section;
