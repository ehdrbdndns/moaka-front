export type DirectoryResponseByAxios = {
  archive_no: number;
  archive_title: string;
  section_list: {
    no: number;
    title: string;
  }[];
}[];
