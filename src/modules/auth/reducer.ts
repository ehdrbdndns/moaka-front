import { AnyAction } from 'redux';
import * as type from './types';

// TODO 리듀서 작성
function auth(
  state: type.initialState = type.initialAuthState,
  action: AnyAction,
) {
  switch (action.type) {
    case type.GET_LOCAL_LOGIN:
      return {
        ...state,
        loading: true,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: null,
      };
    case type.GET_LOCAL_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          no: action.payload.no,
          id: action.payload.id,
          name: action.payload.name,
          profile: action.payload.profile,
          auth_type: action.payload.auth_type,
          isLogin: true,
        },
        error: null,
      };
    case type.GET_LOCAL_LOGIN_FAILE:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: '아이디 혹은 비밀번호가 올바르지 않습니다.',
      };
    case type.GET_LOCAL_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: action.payload,
      };
    case type.GET_GOOGLE_LOGIN:
      return {
        ...state,
        loading: true,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: null,
      };
    case type.GET_GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          no: action.payload.no,
          id: action.payload.id,
          name: action.payload.name,
          profile: action.payload.profile,
          auth_type: action.payload.auth_type,
          isLogin: true,
        },
        error: null,
      };
    case type.GET_GOOGLE_LOGIN_FAILE:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: '회원가입을 먼저 해주세요.',
      };
    case type.GET_GOOGLE_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: action.payload,
      };
    case type.GET_LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case type.GET_LOGOUT_SUCCESS:
      return {
        ...type.initialAuthState,
      };
    case type.GET_LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: action.payload,
      };
    case type.GET_ISLOGIN:
      return {
        ...state,
      };
    case type.GET_ISLOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          no: action.payload.no,
          id: action.payload.id,
          name: action.payload.name,
          profile: action.payload.profile,
          auth_type: action.payload.auth_type,
          isLogin: true,
        },
        error: null,
      };
    case type.GET_ISLOGIN_FAILE:
      return {
        ...type.initialAuthState,
      };
    case type.GET_ISLOGIN_ERROR:
      return {
        ...state,
        loading: false,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: action.payload,
      };
    case type.GET_REGISTER:
      return {
        ...state,
        loading: true,
        data: {
          no: 0,
          id: '',
          name: '',
          profile: '',
          auth_type: '',
          isLogin: false,
        },
        error: null,
      };
    case type.GET_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.GET_REGISTER_FAILE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.GET_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default auth;
