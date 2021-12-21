// TODO 액션 타입 설정
// REF 사용자 정보 수정
export const UPDATE_USER = 'auth/UPDATE_USER' as const;
export const UPDATE_USER_SUCCESS = 'auth/UPDATE_USER_SUCCESS' as const;
export const UPDATE_USER_ERROR = 'auth/UPDATE_USER_ERROR' as const;

// REF 로컬 로그인
export const GET_LOCAL_LOGIN = 'auth/LOCAL_LOGIN' as const;
export const GET_LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS' as const;
export const GET_LOCAL_LOGIN_FAILE = 'auth/LOCAL_LOGIN_FAILE' as const;
export const GET_LOCAL_LOGIN_ERROR = 'auth/LOCAL_LOGIN_ERROR' as const;

// REF 구글 로그인
export const GET_GOOGLE_LOGIN = 'auth/GOOGLE_LOGIN' as const;
export const GET_GOOGLE_LOGIN_SUCCESS = 'auth/GOOGLE_LOGIN_SUCCESS' as const;
export const GET_GOOGLE_LOGIN_FAILE = 'auth/GOOGLE_LOGIN_FAILE' as const;
export const GET_GOOGLE_LOGIN_ERROR = 'auth/GOOGLE_LOGIN_ERROR' as const;

// REF 로그아웃
export const GET_LOGOUT = 'auth/LOGOUT' as const;
export const GET_LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
export const GET_LOGOUT_ERROR = 'auth/LOGOUT_ERROR' as const;

// REF 팝업창을 킬 때에 로그인 여부
export const GET_ISLOGIN = 'auth/ISLOGIN' as const;
export const GET_ISLOGIN_SUCCESS = 'auth/ISLOGIN_SUCCESS' as const;
export const GET_ISLOGIN_FAILE = 'auth/ISLOGIN_FAILE' as const;
export const GET_ISLOGIN_ERROR = 'auth/ISLOGIN_ERROR' as const;

// REF 회원가입
export const GET_REGISTER = 'auth/REGISTER' as const;
export const GET_REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS' as const;
export const GET_REGISTER_FAILE = 'auth/REGISTER_FAILE' as const;
export const GET_REGISTER_ERROR = 'auth/REGISTER_ERROR' as const;

// REF 토큰으로 사용자 정보 셋텡
export const SET_USER = 'auth/SET_USER' as const;
export const SET_USER_SUCCESS = 'auth/SET_USER_SUCCESS' as const;
export const SET_USER_FAIL = 'auth/SET_USER_FAIL' as const;
export const SET_USER_ERROR = 'auth/SET_USER_ERROR' as const;

// REF JWT 토큰 기한 만료
export const EXPIRE_JWT_TOKEN = 'auth/EXPIRE_JWT_TOKEN' as const;

// TODO 액션 함수 매개변수 타입
export type userInfo = {
  no: number;
  id: string;
  name: string;
  profile: string;
  auth_type: string;
  category: Array<string>;
};

export type googleUserInfo = {
  no: number;
  sub: string;
  id: string;
  name: string;
  profile: string;
  auth_type: string;
};

export type localRegisterInfo = {
  id: string;
  pwd: string;
  name: string;
  auth_type: string;
};

//TODO Reducer 변수 타입
// REF 초기 상태 타입
export type authState = {
  no: number;
  id: string;
  name: string;
  profile: string;
  auth_type: string;
  category: Array<string>;
  isLogin: boolean;
};
export type initialState = {
  loading: boolean;
  data: authState;
  error: string | null;
};

// REF 초기 상태 객체
export const initialAuthState: initialState = {
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
  error: null,
};
