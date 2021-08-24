import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionForm from '../components/Section/SectionForm';
import { RootState } from '../modules';
import { deleteSection, makeSection, sectionInfo } from '../modules/section';

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

  return (
    <>
      <SectionForm
        loading={sectionInfo.loading}
        error={sectionInfo.error}
        makeSectionRedux={makeSectionRedux}
        deleteSectionRedux={deleteSectionRedux}
        // FIXME 아카이브와 섹션 고유 번호는 추후 디비로부터 가져와야 함
        archive_no={1}
        section_no={28}
      />
    </>
  );
}

export default Section;
