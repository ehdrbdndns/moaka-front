import { archiveInfo } from '../../modules/archive/types';

export type getGroupArchiveListResponse = {
  isSuccess: boolean;
  error: number;
  archive_list: Array<archiveInfo>;
};

export type getArchiveResponse = {
  isSuccess: boolean;
  error: number;
  archive: archiveInfo;
};
