export type DirectoryResponse = {
  archive_no: number;
  archive_title: string;
  section_list: {
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
