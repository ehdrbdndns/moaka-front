// TODO 액션 타입 설정
// REF 홈 페이지 아카이브 리스트
export const GET_HOME_ARCHIVE_LIST = 'archive/GET_HOME_ARCHIVE_LIST' as const;
export const GET_HOME_ARCHIVE_LIST_SUCCESS =
  'archive/GET_HOME_ARCHIVE_LIST_SUCCESS' as const;
export const GET_HOME_ARCHIVE_LIST_ERROR =
  'archive/GET_HOME_ARCHIVE_LIST_ERROR' as const;

//  REF 소속 아카이브 리스트
export const GET_GROUP_ARCHIVE_LIST = 'archive/GET_GROUP_ARCHIVE_LIST' as const;
export const GET_GROUP_ARCHIVE_LIST_SUCCESS =
  'archive/GET_GROUP_ARCHIVE_LIST_SUCCESS' as const;
export const GET_GROUP_ARCHIVE_LIST_ERROR =
  'archive/GET_GROUP_ARCHIVE_LIST_ERROR' as const;

// REF 아카이브 정보 가져오기
export const GET_ARCHIVE = 'archive/GET_ARCHIVE' as const;
export const GET_ARCHIVE_SUCCESS = 'archive/GET_ARCHIVE_SUCCESS' as const;
export const GET_ARCHIVE_ERROR = 'archvie/GET_ARCHIVE_ERROR' as const;

// REF 아카이브 검색
export const SEARCH_ARCHIVE = 'archive/SEARCH_ARCHIVE' as const;
export const SEARCH_ARCHIVE_SUCCESS = 'archive/SEARCH_ARCHIVE_SUCCESS' as const;
export const SEARCH_ARCHIVE_ERROR = 'archive/SEARCH_ARCHIVE_ERROR' as const;

// REF 아카이브 생성
export const INSERT_ARCHIVE = 'archive/INSERT_ARCHIVE' as const;
export const INSERT_ARCHIVE_SUCCESS = 'archive/INSERT_ARCHIVE_SUCCESS' as const;
export const INSERT_ARCHIVE_ERROR = 'archive/INSERT_ARCHIVE_ERROR' as const;

// REF 아카이브 수정
export const UPDATE_ARCHIVE = 'archive/UPDATE_ARCHIVE' as const;
export const UPDATE_ARCHIVE_SUCCESS = 'archive/UPDATE_ARCHIVE_SUCCESS' as const;
export const UPDATE_ARCHIVE_ERROR = 'archive/UPDATE_ARCHIVE_ERROR' as const;

// REF 아카이브 삭제
export const DELETE_ARCHIVE = 'archive/DELETE_ARCHIVE' as const;
export const DELETE_ARCHIVE_SUCCESS = 'archive/DELETE_ARCHIVE_SUCCESS' as const;
export const DELETE_ARCHIVE_ERROR = 'archive/DELETE_ARCHIVE_ERROR' as const;

// REF 아카이브 좋아요 생성
export const SET_LIKE = 'archive/SET_LIKE' as const;
export const SET_LIKE_SUCCESS = 'archive/SET_LIKE_SUCCESS' as const;
export const SET_LIKE_ERROR = 'archive/SET_LIKE_ERROR' as const;

// REF 아카이브 좋아요 삭제
export const DELETE_LIKE = 'archive/DELETE_LIKE' as const;
export const DELETE_LIKE_SUCCESS = 'archive/DELETE_LIKE_SUCCESS' as const;
export const DELETE_LIKE_ERROR = 'archive/DELETE_LIKE_ERROR' as const;

// REF 아카이브 북마크 생성
export const SET_BOOKMARK = 'archive/SET_BOOKMARK' as const;
export const SET_BOOKMARK_SUCCESS = 'archive/SET_BOOKMARK_SUCCESS' as const;
export const SET_BOOKMARK_ERROR = 'archive/SET_BOOKMARK_ERROR' as const;

// REF 아카이브 북마크 삭제
export const DELETE_BOOKMARK = 'archive/DELETE_BOOKMARK' as const;
export const DELETE_BOOKMARK_SUCCESS =
  'archive/DELETE_BOOKMARK_SUCCESS' as const;
export const DELETE_BOOKMARK_ERROR = 'archive/DELETE_BOOKMARK_ERROR' as const;

// REF JWT 토큰 기한 만료
export const EXPIRE_JWT_TOKEN = 'section/EXPIRE_JWT_TOKEN' as const;

export type archiveBookmarkActionType = {
  bookmark_no: number;
  archive_no: number;
};

export type archiveLikeActionType = {
  like_no: number;
  archive_no: number;
};

export type archiveInfo = {
  no: number;
  user_no: number;
  title: string;
  description: string;
  thumbnail: string;
  creator_name: string;
  privacy_type: string;
  regdate: string;
  tag_list: string[];
  bookmark_no: number;
  bookmark_loading: boolean;
  like_no: number;
  like_loading: boolean;
  category: string;
  type: string; // 인기, 그룹, 북마크, 관심사의 아카이브
};

export type initialState = {
  loading: boolean;
  data: Array<archiveInfo>;
  error: string | null;
};

export const initialArchiveState: initialState = {
  loading: false,
  data: [],
  error: null,
};
