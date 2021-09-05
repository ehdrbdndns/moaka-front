type archiveInfo = {
  no: number;
  title: string;
  description: string;
  tag_list: Array<string>;
  user_no: number;
};
export type archiveListProps = {
  archiveList: Array<archiveInfo>;
};
