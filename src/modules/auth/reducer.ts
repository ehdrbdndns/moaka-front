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
          category: action.payload.category,
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
          category: [],
          isLogin: false,
        },
        error: action.payload,
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
          category: [],
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
          category: [],
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
          category: action.payload.category,
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
          category: [],
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
          category: [],
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
          category: [],
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
          category: action.payload.category,
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
          category: [],
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
          category: [],
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
    case type.SET_USER:
      return {
        ...state,
        loading: true,
      };
    case type.SET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case type.SET_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          name: action.payload.info.name,
          profile: action.payload.info.profile,
          category: action.payload.info.categoryList,
        },
      };
    case type.UPDATE_USER_ERROR:
    case type.SET_USER_ERROR:
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

export default auth;
