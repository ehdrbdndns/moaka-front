import { deleteCommentActionType } from '.';
import { insertCommentOfChunkRequest } from '../../apis/comment/types';
import * as sagaType from './types';

// TODO 액션 함수
export const getSection = (archive_no: number) => ({
  type: sagaType.GET_SECTION,
  payload: archive_no,
});
export const makeSection = (sectionInfo: sagaType.sectionInfo) => ({
  type: sagaType.MAKE_SECTION,
  payload: sectionInfo,
});
export const deleteSection = (section_no: number) => ({
  type: sagaType.DELETE_SECTION,
  payload: section_no,
});
export const updateSection = (sectionInfo: sagaType.sectionInfo) => ({
  type: sagaType.UPDATE_SECTION,
  payload: sectionInfo,
});
export const deleteChunk = (
  deleteChunkInfo: sagaType.deleteChunkActionType,
) => ({
  type: sagaType.DELETE_CHUNK,
  payload: deleteChunkInfo,
});
export const makeChunk = (chunkInfo: sagaType.chunkInfo) => ({
  type: sagaType.MAKE_CHUNK,
  payload: chunkInfo,
});
export const updateChunk = (chunkInfo: sagaType.chunkInfo) => ({
  type: sagaType.UPDATE_CHUNK,
  payload: chunkInfo,
});
export const makeRelativeChunk = (
  relativeChunkInfo: sagaType.relativeChunkInfo,
) => ({
  type: sagaType.MAKE_RELATIVE_CHUNK,
  payload: relativeChunkInfo,
});
export const deleteRelativeChunk = (
  deleteRelativeChunkActionType: sagaType.deleteRelativeChunkActionType,
) => ({
  type: sagaType.DELETE_RELATIVE_CHUNK,
  payload: deleteRelativeChunkActionType,
});
export const setBookmark = (bookmarkInfo: sagaType.bookmarkActionType) => ({
  type: sagaType.SET_BOOKMARK,
  payload: bookmarkInfo,
});
export const deleteBookmark = (bookmarkInfo: sagaType.bookmarkActionType) => ({
  type: sagaType.DELETE_BOOKMARK,
  payload: bookmarkInfo,
});
export const setLike = (likeInfo: sagaType.likeActionType) => ({
  type: sagaType.SET_LIKE,
  payload: likeInfo,
});
export const deleteLike = (likeInfo: sagaType.likeActionType) => ({
  type: sagaType.DELETE_LIKE,
  payload: likeInfo,
});
export const setComment = (commentInfo: insertCommentOfChunkRequest) => ({
  type: sagaType.SET_COMMENT,
  payload: commentInfo,
});
export const deleteComment = (
  deleteCommentActionType: deleteCommentActionType,
) => ({
  type: sagaType.DELETE_COMMENT,
  payload: deleteCommentActionType,
});
