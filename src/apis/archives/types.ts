import { archiveInfo } from '../../modules/archive/types';

export type getGroupArchiveListResponse = {
  isSuccess: boolean;
  error: number;
  archive_list: Array<archiveInfo>;
};

export type getBookmarkArchiveListResponse = {
  isSuccess: boolean;
  error: number;
  archive_list: Array<archiveInfo>;
};

export type getTopArchiveListResponse = {
  isSuccess: boolean;
  error: number;
  archive_list: Array<archiveInfo>;
};

export type getArchiveResponse = {
  isSuccess: boolean;
  error: number;
  archive: archiveInfo;
};

export type deleteArchiveResponse = {
  isSuccess: boolean;
  error: number;
};

export type insertArchiveResponse = {
  isSuccess: boolean;
  archive: archiveInfo;
  error: number;
};

export type insertArchiveRequest = {
  info: {
    title: string;
    description: string;
    tag_list: string[];
    privacy_type: string;
    group_no_list: number[];
  };
  thumbnailFile: File;
};

export type retrieveArchiveBySearchResponse = {
  isSuccess: boolean;
  error: number;
  archive_list: Array<archiveInfo>;
};
