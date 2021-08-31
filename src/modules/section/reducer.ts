import { AnyAction } from 'redux';
import * as type from './types';

function section(
  state: type.initialState = type.initailSectionState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.MAKE_SECTION:
    case type.DELETE_SECTION:
    case type.UPDATE_SECTION:
    case type.DELETE_CHUNK:
      return {
        ...state,
        loading: true,
        data: [...state.data],
        error: null,
      };
    case type.UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.map(section => {
            if (section.no === action.payload.no) {
              action.payload.chunk_list = section.chunk_list;
              return action.payload;
            } else {
              return section;
            }
            // section.no === action.payload.no ? action.payload : section,
          }),
        ],
      };
    case type.MAKE_SECTION_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case type.DELETE_SECTION_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(section => section.no !== action.payload)],
        loading: false,
      };
    case type.DELETE_CHUNK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.map(section => {
            if (section.no === action.payload.section_no) {
              let chunk_list = section.chunk_list.filter(
                chunk => chunk.no !== action.payload.chunk_no,
              );
              section.chunk_list = chunk_list;
            }
            return section;
          }),
        ],
      };
    case type.DELETE_CHUNK_NOAUTH:
    case type.MAKE_SECTION_ERROR:
    case type.DELETE_SECTION_ERROR:
    case type.GET_SECTION_ERROR:
    case type.UPDATE_SECTION_ERROR:
    case type.DELETE_CHUNK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.GET_SECTION:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case type.GET_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
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
