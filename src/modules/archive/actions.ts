import * as sagaType from './types';

// TODO 액션 함수
export const getGroupArchiveList = () => ({
  type: sagaType.GET_GROUP_ARCHIVE_LIST,
});
export const getArchive = (archive_no: number) => ({
  type: sagaType.GET_ARCHIVE,
  payload: archive_no,
});
