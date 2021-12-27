import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArchiveDetailForm from '../../components/Archive/ArchiveDetail';
import { RootState } from '../../modules';
import { getArchive } from '../../modules/archive';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { getSection } from '../../modules/section';

function ArchiveDetail() {
  const dispatch = useDispatch();
  const archiveInfo = useSelector((state: RootState) => state.archive);
  const sectionInfo = useSelector((state: RootState) => state.section);
  const authInfo = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    if (query.no !== null) {
      // 아카이브 불러오기
      dispatch(getArchive(+query.no));

      // 섹션 리스트 불러오기
      dispatch(getSection(+query.no));
    }
  }, [dispatch, query.no]);

  return (
    <>
      <ArchiveDetailForm
        dispatch={dispatch}
        authInfo={authInfo}
        archiveInfo={archiveInfo}
        sectionInfo={sectionInfo}
      ></ArchiveDetailForm>
    </>
  );
}

export default ArchiveDetail;
