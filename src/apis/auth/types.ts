export type setUserResponse = {
  isSuccess: boolean;
  error: number;
  no: number;
  id: string;
  name: string;
  profile: string;
  category: Array<string>;
};

export type updateUserRequest = {
  info: {
    id: string;
    name: string;
    profile: string;
    categoryList: Array<string>;
  };
  profileFile: File | null;
};

export type updateUserResponse = {
  isSuccess: boolean;
  error: number;
  token: string;
  profile: string;
};

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
  category: Array<string>;
  roles: Array<string>;
  id: string;
  sub: string;
};
