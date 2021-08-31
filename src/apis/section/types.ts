import { sectionInfo } from '../../modules/section';

export type getSectionResponseByAxios = {
  isSuccess: boolean;
  error: number;
  section_list: Array<sectionInfo>;
};
export type makeSectionResponseByAxios = {
  isSuccess: boolean;
  section_no: number;
  error: number;
};
export type deleteSectionResponseByAxios = {
  isSuccess: boolean;
  error: number;
};
export type updateSectionResponseByAxios = {
  isSuccess: boolean;
  error: number;
};
export type deleteChunkResponseByAxios = {
  isSuccess: boolean;
  error: number;
};
