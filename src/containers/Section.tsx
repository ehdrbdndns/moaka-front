import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionForm from '../components/Section/SectionForm';
import { RootState } from '../modules';
import {
  chunkInfo,
  deleteChunk,
  deleteChunkActionType,
  deleteSection,
  getSection,
  makeChunk,
  makeSection,
  sectionInfo,
  updateChunk,
  updateSection,
} from '../modules/section';

function Section() {
  const dispatch = useDispatch();
  const sectionInfo = useSelector((state: RootState) => state.section);

  function makeSectionRedux(sectionInfo: sectionInfo) {
    dispatch(makeSection(sectionInfo));
  }

  function deleteSectionRedux(section_no: number) {
    console.log(section_no);
    dispatch(deleteSection(section_no));
  }

  function getSectionRedux(archive_no: number) {
    dispatch(getSection(archive_no));
  }

  function updateSectionRedux(sectionInfo: sectionInfo) {
    dispatch(updateSection(sectionInfo));
  }

  function deleteChunkRedux(deleteChunkInfo: deleteChunkActionType) {
    dispatch(deleteChunk(deleteChunkInfo));
  }

  function makeChunkRedux(chunkInfo: chunkInfo) {
    dispatch(makeChunk(chunkInfo));
  }

  function updateChunkRedux(chunkInfo: chunkInfo) {
    dispatch(updateChunk(chunkInfo));
  }

  return (
    <>
      <SectionForm
        loading={sectionInfo.loading}
        error={sectionInfo.error}
        section_list={sectionInfo.data}
        makeSectionRedux={makeSectionRedux}
        deleteSectionRedux={deleteSectionRedux}
        getSectionRedux={getSectionRedux}
        updateSectionRedux={updateSectionRedux}
        deleteChunkRedux={deleteChunkRedux}
        makeChunkRedux={makeChunkRedux}
        updateChunkRedux={updateChunkRedux}
        // FIXME 아카이브 고유 번호는 추후 디비로부터 가져와야 함
        archive_no={1}
      />
    </>
  );
}

export default Section;
