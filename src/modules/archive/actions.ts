import {
  insertArchiveRequest,
  updateArchiveRequest,
} from '../../apis/archives/types';
import * as sagaType from './types';

// TODO 액션 함수
export const insertArchive = (insertArchive: insertArchiveRequest) => ({
  type: sagaType.INSERT_ARCHIVE,
  payload: insertArchive,
});
export const updateArchive = (updateArchiveRequest: updateArchiveRequest) => ({
  type: sagaType.UPDATE_ARCHIVE,
  payload: updateArchiveRequest,
});
export const getTopArchiveList = () => ({
  type: sagaType.GET_TOP_ARCHIVE_LIST,
});
export const getCategoryArchiveList = () => ({
  type: sagaType.GET_CATEGORY_ARCHIVE_LIST,
});
export const getGroupArchiveList = () => ({
  type: sagaType.GET_GROUP_ARCHIVE_LIST,
});
export const getHomeArchiveList = () => ({
  type: sagaType.GET_HOME_ARCHIVE_LIST,
});
export const getArchive = (archive_no: number) => ({
  type: sagaType.GET_ARCHIVE,
  payload: archive_no,
});
export const searchArchive = (param: string) => ({
  type: sagaType.SEARCH_ARCHIVE,
  payload: param,
});
export const deleteArchive = (archive_no: number) => ({
  type: sagaType.DELETE_ARCHIVE,
  payload: archive_no,
});
export const setArchiveLike = (likeInfo: sagaType.archiveLikeActionType) => ({
  type: sagaType.SET_LIKE,
  payload: likeInfo,
});
export const deleteArchiveLike = (
  likeInfo: sagaType.archiveLikeActionType,
) => ({
  type: sagaType.DELETE_LIKE,
  payload: likeInfo,
});
export const setArchiveBookmark = (
  bookmarkInfo: sagaType.archiveBookmarkActionType,
) => ({
  type: sagaType.SET_BOOKMARK,
  payload: bookmarkInfo,
});
export const deleteArchiveBookmark = (
  bookmarkInfo: sagaType.archiveBookmarkActionType,
) => ({
  type: sagaType.DELETE_BOOKMARK,
  payload: bookmarkInfo,
});
export const resetArchive = () => ({
  type: sagaType.RESET_ARCHIVE,
});
