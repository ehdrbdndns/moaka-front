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
  playload: sectionInfo,
});
