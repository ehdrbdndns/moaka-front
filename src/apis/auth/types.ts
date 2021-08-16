export type LoginInfo = {
  id: string;
  pwd: string;
};

export type LoginResponseByAxios = {
  isLogin: boolean;
  token: string;
  error: string | null;
};

export type JwtDecodeFromUserInfo = {
  age: string;
  aud: string;
  auth_type: string;
  exp: Number;
  id: string;
  iss: string;
  name: string;
  no: number;
  profile: string;
  pwd: string;
  regdate: string;
  version: string;
};
