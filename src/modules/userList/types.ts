// TODO 액션 타입 설정
// REF ID로 유저 리스트 검색
export const SEARCH_USERLIST = 'userList/SEARCH_USERLIST' as const;
export const SEARCH_USERLIST_SUCCESS =
  'userList/SEARCH_USERLIST_SUCCESS' as const;
export const SEARCH_USERLIST_ERROR = 'userList/SEARCH_USERLIST_ERROR' as const;
export const SEARCH_USERLIST_FAILE = 'userList/SEARCH_USERLIST_FAILE' as const;

// REF JWT 토큰 기한 만료
export const EXPIRE_JWT_TOKEN = 'userList/EXPIRE_JWT_TOKEN' as const;

//TODO Reducer 변수 타입
// REF 초기 상태 타입
export type userListState = {
  no: number;
  id: string;
  name: string;
  profile: string;
};
export type initialState = {
  loading: boolean;
  data: Array<userListState>;
  error: string | null;
};

// REF 초기 상태 객체
export const initialAuthState: initialState = {
  loading: false,
  data: [],
  error: null,
};
