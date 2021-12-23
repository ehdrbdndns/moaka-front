import { chunkInfo } from '../../modules/section';

export type getChunkOfBookmarkResponse = {
  isSuccess: boolean;
  error: number;
  chunk_list: Array<chunkInfo>;
};

export type deleteChunkResponse = {
  isSuccess: boolean;
  error: number;
};
export type insertChunkResponse = {
  no: number;
  isSuccess: boolean;
  error: number;
};
export type makeChunkResponse = {
  isSuccess: boolean;
  error: number;
  no: number;
  regdate: string;
};
export type makeRelativeChunkResponse = {
  isSuccess: boolean;
  error: number;
  no: number;
  regdate: string;
};
export type updateChunkResponse = {
  isSuccess: boolean;
  error: number;
};
