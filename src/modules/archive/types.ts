// TODO 액션 타입 설정
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

// REF JWT 토큰 기한 만료
export const EXPIRE_JWT_TOKEN = 'section/EXPIRE_JWT_TOKEN' as const;

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
  like_no: number;
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
