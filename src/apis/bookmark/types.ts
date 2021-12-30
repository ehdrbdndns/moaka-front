export type linkPreviewResponse = {
  domain: string;
  link: string;
  description: string;
  thumbnail: string;
  favicon: string;
  error: number;
};

export type insertBookmarkOfArchiveResponse = {
  isSuccess: boolean;
  error: number;
  bookmark_no: number;
};

export type insertBookmarkOfChunkResponse = {
  isSuccess: boolean;
  error: number;
  bookmark_no: number;
};

export type deleteBookmarkResponse = {
  isSuccess: boolean;
  error: number;
};
