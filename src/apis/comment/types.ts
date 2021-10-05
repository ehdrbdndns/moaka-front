import { commentInfo } from '../../modules/section';

export type insertCommentOfChunkResponse = {
  isSuccess: boolean;
  error: number;
  comment_info: commentInfo | null;
};

export type insertCommentOfChunkRequest = {
  section_no: number;
  chunk_no: number;
  group_num: number;
  content: string;
  layer: number;
};

export type deleteCommentOfChunkResponse = {
  isSuccess: boolean;
  error: number;
};
