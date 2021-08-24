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
export const UPDATE_SECTION_ERROR = 'section/UPDATE_SECTION_ERROR'

// REF JWT 토큰 기한 만료
export const EXPIRE_JWT_TOKEN = 'section/EXPIRE_JWT_TOKEN' as const;

export type sectionInfo = {
  no: number | undefined;
  archive_no: number;
  title: string;
  description: string;
  tag_list: Array<string>;
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
