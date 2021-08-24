export type LoginInfo = {
  id: string;
  pwd: string;
};

export type googleRegisterInfo = {
  sub: string;
  id: string;
  name: string;
  profile: string;
  auth_type: string;
};

export type RegisterResponseByAxios = {
  no: number;
  isSuccess: boolean;
  error: string | null;
};

export type LoginResponseByAxios = {
  isLogin: boolean;
  token: string;
  error: string | null;
};

export type JwtDecodeFromUserInfo = {
  exp: number;
  iat: number;
  name: string;
  no: number;
  profile: string;
  roles: Array<string>;
  id: string;
  sub: string;
};
