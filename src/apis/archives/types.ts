import { archiveInfo } from '../../modules/archive/types';
import { searchUserType } from '../user/types';

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

export type getArchiveBySearchResponse = {
  isSuccess: boolean;
  error: number;
  archive_list: Array<archiveInfo>;
};

export type getCategoryArchiveResponse = {
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
    privacy_type: string;
    thumbnail: string;
    tag_list: string[];
    group_no_list: number[];
    category: string;
  };
  thumbnailFile: File | undefined;
};

export type updateArchiveRequest = {
  info: {
    no: number;
    title: string;
    description: string;
    tag_list: string[];
    privacy_type: string;
    group_no_list: number[];
    thumbnail: string;
    category: string;
  };
  thumbnailFile: File | undefined;
  user_list: Array<searchUserType>;
};

export type updateArchiveResponse = {
  isSuccess: boolean;
  error: number;
  thumbnail: string;
};
