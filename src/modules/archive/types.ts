// TODO 액션 타입 설정
//  REF 소속 아카이브 리스트
export const GET_GROUP_ARCHIVE_LIST = 'archive/GET_GROUP_ARCHIVE_LIST' as const;
export const GET_GROUP_ARCHIVE_LIST_SUCCESS =
  'archive/GET_GROUP_ARCHIVE_LIST_SUCCESS' as const;
export const GET_GROUP_ARCHIVE_LIST_ERROR =
  'archive/GET_GROUP_ARCHIVE_LIST_ERROR' as const;

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
