export type DirectoryResponseByAxios = {
  title: string;
  list: {
    no: number;
    title: string;
  }[];
}[];

export type userListType = {
  no: number;
  id: string;
  name: string;
  profile: string;
};

export type searchUserListResponse = {
  isSuccess: boolean;
  user_list: Array<userListType>;
  error: number;
};

export type searchUserType = {
  no: number;
  id: string;
  name: string;
  profile: string;
};

export type searchUserResponse = {
  isSuccess: boolean;
  user: searchUserType;
  error: number;
};

export type retrieveGroupUserOfArchiveByArchiveNoResponse = {
  user_list: Array<userListType>;
  isSuccess: boolean;
  error: number;
};
