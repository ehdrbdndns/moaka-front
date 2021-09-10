import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import ArchiveDetailForm from '../components/ArchiveDetail/ArchiveDetailForm';
import ArchiveHeaderForm from '../components/ArchiveHeader/ArchiveHeaderForm';
import { RootState } from '../modules';
import {
  archiveBookmarkActionType,
  archiveLikeActionType,
  deleteArchiveBookmark,
  deleteArchiveLike,
  getArchive,
  setArchiveBookmark,
  setArchiveLike,
} from '../modules/archive';
import { setUser } from '../modules/auth';
import {
  bookmarkActionType,
  chunkInfo,
  deleteBookmark,
  deleteChunk,
  deleteChunkActionType,
  deleteLike,
  deleteSection,
  getSection,
  likeActionType,
  makeChunk,
  makeSection,
  sectionInfo,
  setBookmark,
  setLike,
  updateChunk,
  updateSection,
} from '../modules/section';
import queryString from 'query-string';

function ArchiveDetail() {
  const dispatch = useDispatch();
  const sectionInfo = useSelector((state: RootState) => state.section);
  const archiveInfo = useSelector((state: RootState) => state.archive);
  const userInfo = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  const query = queryString.parse(location.search);

  const setUserRedux = useCallback(() => {
    dispatch(setUser());
  }, [dispatch]);

  const setArchiveBookmarkRedux = useCallback(
    (bookmarkInfo: archiveBookmarkActionType) => {
      dispatch(setArchiveBookmark(bookmarkInfo));
    },
    [dispatch],
  );

  const deleteArchiveBookmarkRedux = useCallback(
    (bookmarkInfo: archiveBookmarkActionType) => {
      dispatch(deleteArchiveBookmark(bookmarkInfo));
    },
    [dispatch],
  );

  const deleteArchiveLikeRedux = useCallback(
    (likeInfo: archiveLikeActionType) => {
      dispatch(deleteArchiveLike(likeInfo));
    },
    [dispatch],
  );

  const setArchiveLikeRedux = useCallback(
    (likeInfo: archiveLikeActionType) => {
      dispatch(setArchiveLike(likeInfo));
    },
    [dispatch],
  );

  const getArchiveRedux = useCallback(
    (archive_no: number) => {
      dispatch(getArchive(archive_no));
    },
    [dispatch],
  );

  const deleteSectionRedux = useCallback(
    (section_no: number) => {
      dispatch(deleteSection(section_no));
    },
    [dispatch],
  );

  const getSectionRedux = useCallback(
    (archive_no: number) => {
      dispatch(getSection(archive_no));
    },
    [dispatch],
  );

  const updateSectionRedux = useCallback(
    (sectionInfo: sectionInfo) => {
      dispatch(updateSection(sectionInfo));
    },
    [dispatch],
  );

  const deleteChunkRedux = useCallback(
    (deleteChunkInfo: deleteChunkActionType) => {
      dispatch(deleteChunk(deleteChunkInfo));
    },
    [dispatch],
  );

  const makeChunkRedux = useCallback(
    (chunkInfo: chunkInfo) => {
      dispatch(makeChunk(chunkInfo));
    },
    [dispatch],
  );

  const updateChunkRedux = useCallback(
    (chunkInfo: chunkInfo) => {
      dispatch(updateChunk(chunkInfo));
    },
    [dispatch],
  );

  const setBookmarkRedux = useCallback(
    (bookmarkActionType: bookmarkActionType) => {
      dispatch(setBookmark(bookmarkActionType));
    },
    [dispatch],
  );

  const deleteBookmarkRedux = useCallback(
    (bookmarkActionType: bookmarkActionType) => {
      dispatch(deleteBookmark(bookmarkActionType));
    },
    [dispatch],
  );

  const setLikeRedux = useCallback(
    (likeActionType: likeActionType) => {
      dispatch(setLike(likeActionType));
    },
    [dispatch],
  );

  const deleteLikeRedux = useCallback(
    (likeActionType: likeActionType) => {
      dispatch(deleteLike(likeActionType));
    },
    [dispatch],
  );

  useEffect(() => {
    if (query.no !== null) {
      getArchiveRedux(+query.no);
      getSectionRedux(+query.no);
      setUserRedux();
    }
  }, [getArchiveRedux, getSectionRedux, setUserRedux, query.no]);

  return (
    <div>
      <ArchiveHeaderForm
        loading={archiveInfo.loading}
        error={archiveInfo.error}
        archive_info={archiveInfo.data[0]}
        user_info={userInfo.data}
        setUserRedux={setUserRedux}
        getArchiveRedux={getArchiveRedux}
        setArchiveLikeRedux={setArchiveLikeRedux}
        deleteArchiveLikeRedux={deleteArchiveLikeRedux}
        setArchiveBookmarkRedux={setArchiveBookmarkRedux}
        deleteArchiveBookmarkRedux={deleteArchiveBookmarkRedux}
      />
      <ArchiveDetailForm
        section_loading={sectionInfo.loading}
        section_error={sectionInfo.error}
        section_list={sectionInfo.data}
        archive_loading={archiveInfo.loading}
        archive_error={archiveInfo.error}
        archive_info={archiveInfo.data[0]}
        user_info={userInfo.data}
        deleteSectionRedux={deleteSectionRedux}
        updateSectionRedux={updateSectionRedux}
        deleteChunkRedux={deleteChunkRedux}
        makeChunkRedux={makeChunkRedux}
        updateChunkRedux={updateChunkRedux}
        setBookmarkRedux={setBookmarkRedux}
        deleteBookmarkRedux={deleteBookmarkRedux}
        setLikeRedux={setLikeRedux}
        deleteLikeRedux={deleteLikeRedux}
      />
    </div>
  );
}

export default ArchiveDetail;
