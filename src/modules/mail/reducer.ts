import { AnyAction } from 'redux';
import * as type from './types';

// TODO 리듀서 작성
function mail(
  state: type.initialState = type.initialAuthState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.INSERT_REGISTER_MAILCODE:
      return {
        ...state,
        loading: true,
        data: {
          no: 0,
          address: '',
          code: 0,
          auth: false,
        },
        error: null,
      };
    case type.EXPIRE_REGISTER_MAILCODE:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          address: state.data.address,
          code: 0,
          auth: false,
        },
        error: null,
      };
    case type.SEND_RESGISTER_MAILCODE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.EXPIRE_REGISTER_MAILCODE_SUCCESS:
      return state;
    case type.INSERT_REGISTER_MAILCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.SEND_RESGISTER_MAILCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          auth: true,
        },
      };
    case type.SEND_RESGISTER_MAILCODE_ERROR:
    case type.INSERT_REGISTER_MAILCODE_ERROR:
    case type.EXPIRE_REGISTER_MAILCODE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default mail;
