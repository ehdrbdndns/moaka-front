export type HeaderProps = {
  title: string;
  loginStatus: boolean; //로그인 여부
};

export interface ArchiveInfo {
  no: number;
  title: string;
  description: string;
  tag_list: Array<string>;
  user_no: number;
}
