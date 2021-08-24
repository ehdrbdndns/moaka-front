import { AnyAction } from 'redux';
import * as type from './types';

function section(
  state: type.initialState = type.initailSectionState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.MAKE_SECTION:
    case type.DELETE_SECTION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.MAKE_SECTION_SUCCESS:
    case type.DELETE_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.MAKE_SECTION_ERROR:
    case type.DELETE_SECTION_ERROR:
    case type.GET_SECTION_ERROR:
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
