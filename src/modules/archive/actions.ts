import * as sagaType from './types';

// TODO 액션 함수
export const getGroupArchiveList = () => ({
  type: sagaType.GET_GROUP_ARCHIVE_LIST,
});
export const getArchive = (archive_no: number) => ({
  type: sagaType.GET_ARCHIVE,
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
