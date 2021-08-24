import * as sagaType from './types';

// TODO 액션 함수
export const makeSection = (sectionInfo: sagaType.sectionInfo) => ({
  type: sagaType.MAKE_SECTION,
  payload: sectionInfo,
});
export const deleteSection = (section_no: number) => ({
  type: sagaType.DELETE_SECTION,
  payload: section_no,
});
