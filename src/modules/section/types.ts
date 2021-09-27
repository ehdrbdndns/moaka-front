// TODO 액션 타입 설정
// REF 섹션 생성
export const MAKE_SECTION = 'section/MAKE_SECTION' as const;
export const MAKE_SECTION_SUCCESS = 'section/MAEK_SECTION_SUCCESS' as const;
export const MAKE_SECTION_ERROR = 'section/MAKE_SECTION_ERROR' as const;

// REF 섹션 삭제
export const DELETE_SECTION = 'section/DELETE_SECTION' as const;
export const DELETE_SECTION_SUCCESS = 'section/DELETE_SECTION_SUCCESS' as const;
export const DELETE_SECTION_ERROR = 'section/DELETE_SECTION_ERROR' as const;

// REF 섹션 불러오기
export const GET_SECTION = 'section/GET_SECTION' as const;
export const GET_SECTION_SUCCESS = 'section/GET_SECTION_SUCCESS' as const;
export const GET_SECTION_ERROR = 'section/GET_SECTION_ERROR' as const;

// REF 섹션 수정하기
export const UPDATE_SECTION = 'section/UPDATE_SECTION' as const;
export const UPDATE_SECTION_SUCCESS = 'section/UPDATE_SECTION_SUCCESS' as const;
export const UPDATE_SECTION_ERROR = 'section/UPDATE_SECTION_ERROR';

// REF 북마크 청크 불러오기
export const GET_BOOKMARK_CHUNK = 'section/GET_BOOKMARK_CHUNK' as const;
export const GET_BOOKMARK_CHUNK_SUCCESS =
  'section/GET_BOOKMARK_CHUNK_SUCCESS' as const;
export const GET_BOOKMARK_CHUNK_ERROR =
  'section/GET_BOOKMARK_CHUNK_ERROR' as const;

// REF 청크 삭제
export const DELETE_CHUNK = 'section/DELETE_CHUNK' as const;
export const DELETE_CHUNK_SUCCESS = 'section/DELETE_CHUNK_SUCCESS' as const;
export const DELETE_CHUNK_ERROR = 'section/DELETE_CHUNK_ERROR' as const;
export const DELETE_CHUNK_NOAUTH = 'section/DELETE_CHUNK_NOAUTH' as const;

// REF 청크 생성
export const MAKE_CHUNK = 'section/MAKE_CHUNK' as const;
export const MAKE_CHUNK_SUCCESS = 'section/MAKE_CHUNK_SUCCESS' as const;
export const MAKE_CHUNK_ERROR = 'section/MAKE_CHUNK_ERROR' as const;
export const MAKE_CHUNK_NOAUTH = 'section/MAKE_CHUNK_NOAUTH' as const;

// REF 청크 수정
export const UPDATE_CHUNK = 'section/UPDATE_CHUNK' as const;
export const UPDATE_CHUNK_SUCCESS = 'section/UPDATE_CHUNK_SUCCESS' as const;
export const UPDATE_CHUNK_ERROR = 'section/UPDATE_CHUNK_ERROR' as const;
export const UPDATE_CHUNK_NOAUTH = 'section/UPDATE_CHUNK_NOAUTH' as const;

// REF 관련 청크 생성
export const MAKE_RELATIVE_CHUNK = 'section/MAKE_RELATIVE_CHUNK' as const;
export const MAKE_RELATIVE_CHUNK_SUCCESS =
  'section/MAKE_RELATIVE_CHUNK_SUCCESS' as const;
export const MAKE_RELATIVE_CHUNK_ERROR =
  'section/MAKE_RELATIVE_CHUNK_ERROR' as const;
export const MAKE_RELATIVE_CHUNK_NOAUTH =
  'section/MAKE_RELATIVE_CHUNK_NOAUTH' as const;

// REF 관련 청크 삭제
export const DELETE_RELATIVE_CHUNK = 'section/DELETE_RELATIVE_CHUNK' as const;
export const DELETE_RELATIVE_CHUNK_SUCCESS =
  'section/DELETE_RELATIVE_CHUNK_SUCCESS' as const;
export const DELETE_RELATIVE_CHUNK_ERROR =
  'section/DELETE_RELATIVE_CHUNK_ERROR' as const;
export const DELETE_RELATIVE_CHUNK_NOAUTH =
  'section/DELETE_RELATIVE_CHUNK_NOAUTH' as const;

// REF 북마크 생성
export const SET_BOOKMARK = 'section/SET_BOOKMARK' as const;
export const SET_BOORMARK_SUCCESS = 'section/SET_BOOKMARK_SUCCESS' as const;
export const SET_BOOKMARK_ERROR = 'section/SET_BOOKMARK_ERROR' as const;

// REF 북마크 삭제
export const DELETE_BOOKMARK = 'section/DELETE_BOOKMARK' as const;
export const DELETE_BOOKMARK_SUCCESS =
  'section/DELETE_BOOKMARK_SUCCESS' as const;
export const DELETE_BOOKMARK_ERROR = 'section/DELETE_BOOKMARK_ERROR' as const;

// REF 좋아요 생성
export const SET_LIKE = 'section/SET_LIKE' as const;
export const SET_LIKE_SUCCESS = 'section/SET_LIKE_SUCCESS' as const;
export const SET_LIKE_ERROR = 'section/SET_LIKE_ERROR' as const;

// REF 좋아요 삭제
export const DELETE_LIKE = 'section/DELETE_LIKE' as const;
export const DELETE_LIKE_SUCCESS = 'section/DELETE_LIKE_SUCCESS' as const;
export const DELETE_LIKE_ERROR = 'section/DELETE_LIKE_ERROR' as const;

// REF 댓글 생성
export const SET_COMMENT = 'section/SET_COMMENT' as const;
export const SET_COMMENT_SUCCESS = 'section/SET_COMMENT_SUCCESS' as const;
export const SET_COMMENT_ERROR = 'section/SET_COMMENT_ERROR' as const;

// REF 댓글 삭제
export const DELETE_COMMENT = 'section/DELETE_COMMENT' as const;
export const DELETE_COMMENT_SUCCESS = 'section/DELETE_COMMENT_SUCCESS' as const;
export const DELETE_COMMENT_ERROR = 'section/DELETE_COMMENT_ERROR' as const;

// REF JWT 토큰 기한 만료
export const EXPIRE_JWT_TOKEN = 'section/EXPIRE_JWT_TOKEN' as const;

export type deleteCommentActionType = {
  section_no: number;
  chunk_no: number;
  comment_no: number;
  layer: number; // 0: 부모 댓글, 1: 자식 댓글
};

export type likeActionType = {
  like_no: number;
  chunk_no: number;
  section_no: number;
};

export type bookmarkActionType = {
  bookmark_no: number;
  chunk_no: number;
  section_no: number;
};

export type deleteChunkActionType = {
  section_no: number;
  chunk_no: number;
};

export type deleteRelativeChunkActionType = {
  section_no: number;
  chunk_no: number;
  group_num: number;
};

export type commentInfo = {
  no: number;
  section_no: number;
  chunk_no: number;
  user_no: number;
  content: string;
  content_order: number;
  layer: number;
  group_num: number;
  profile: string;
  name: string;
  regdate: string;
};

export type relativeChunkInfo = {
  no: number;
  group_num: number;
  section_no: number;
  title: string;
  thumbnail: string;
  link: string;
  link_title: string;
  link_description: string;
  description: string;
  regdate: string;
};

export type chunkInfo = {
  no: number;
  section_no: number;
  title: string;
  thumbnail: string;
  link: string;
  link_title: string;
  link_description: string;
  description: string;
  regdate: string;
  tag_list: Array<string>;
  bookmark_no: number;
  bookmark_loading: boolean;
  like_no: number;
  like_loading: boolean;
  relative_chunk_list: Array<relativeChunkInfo>;
  relative_chunk_loading: boolean;
  comment_list: Array<commentInfo>;
  comment_loading: boolean;
};

export type sectionInfo = {
  no: number | undefined;
  archive_no: number;
  title: string;
  description: string;
  tag_list: Array<string>;
  chunk_list: Array<chunkInfo>;
  regdate: string | undefined;
};

export type initialState = {
  loading: boolean;
  data: Array<sectionInfo>;
  error: string | null;
};

export const initailSectionState: initialState = {
  loading: false,
  data: [],
  error: null,
};
