// TODO 액션 타입 설정
// REF 회원가입 인증코드 생성
export const INSERT_REGISTER_MAILCODE =
  'mail/INSERT_REGISTER_MAILCODE' as const;
export const INSERT_REGISTER_MAILCODE_SUCCESS =
  'mail/INSERT_REGISTER_MAILCODE_SUCCESS' as const;
export const INSERT_REGISTER_MAILCODE_ERROR =
  'mail/INSERT_REGISTER_MAILCODE_ERROR' as const;

// REF 회원가입 인증코드 만료
export const EXPIRE_REGISTER_MAILCODE =
  'mail/EXPIRE_REGISTER_MAILCODE' as const;
export const EXPIRE_REGISTER_MAILCODE_SUCCESS =
  'mail/EXPIRE_REGISTER_MAILCODE_SUCCESS' as const;
export const EXPIRE_REGISTER_MAILCODE_ERROR =
  'mail/EXPIRE_REGISTER_MAILCODE_ERROR' as const;

// REF 회원가입 인증코드 전송
export const SEND_RESGISTER_MAILCODE = 'mail/SEND_REGISTER_MAILCODE' as const;
export const SEND_RESGISTER_MAILCODE_SUCCESS =
  'mail/SEND_REGISTER_MAILCODE_SUCCESS' as const;
export const SEND_RESGISTER_MAILCODE_ERROR =
  'mail/SEND_REGISTER_MAILCODE_ERROR' as const;

//TODO Reducer 변수 타입
// REF 초기 상태 타입
export type mailState = {
  no: number;
  address: string;
  code: number;
  auth: boolean;
};
export type initialState = {
  loading: boolean;
  data: mailState;
  error: string | null;
};

// REF 초기 상태 객체
export const initialAuthState: initialState = {
  loading: false,
  data: {
    no: 0,
    address: '',
    code: 0,
    auth: false,
  },
  error: null,
};
