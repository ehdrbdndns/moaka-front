import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function ArchiveDetail() {
  const dispatch = useDispatch();
  const sectionInfo = useSelector((state: RootState) => state.section);
  const archiveInfo = useSelector((state: RootState) => state.archive);

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

  const makeSectionRedux = useCallback(
    (sectionInfo: sectionInfo) => {
      dispatch(makeSection(sectionInfo));
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

  return (
    <div>
      <ArchiveHeaderForm
        loading={archiveInfo.loading}
        error={archiveInfo.error}
        archive_info={archiveInfo.data[0]}
        getArchiveRedux={getArchiveRedux}
        setArchiveLikeRedux={setArchiveLikeRedux}
        deleteArchiveLikeRedux={deleteArchiveLikeRedux}
        setArchiveBookmarkRedux={setArchiveBookmarkRedux}
        deleteArchiveBookmarkRedux={deleteArchiveBookmarkRedux}
      />
      {/* <Section /> */}
      <ArchiveDetailForm
        section_loading={sectionInfo.loading}
        section_error={sectionInfo.error}
        section_list={sectionInfo.data}
        archive_loading={archiveInfo.loading}
        archive_error={archiveInfo.error}
        archive_info={archiveInfo.data}
        makeSectionRedux={makeSectionRedux}
        deleteSectionRedux={deleteSectionRedux}
        getSectionRedux={getSectionRedux}
        updateSectionRedux={updateSectionRedux}
        deleteChunkRedux={deleteChunkRedux}
        makeChunkRedux={makeChunkRedux}
        updateChunkRedux={updateChunkRedux}
        setBookmarkRedux={setBookmarkRedux}
        deleteBookmarkRedux={deleteBookmarkRedux}
        setLikeRedux={setLikeRedux}
        deleteLikeRedux={deleteLikeRedux}
      />
      {/* <ArchiveBar view="detail" /> */}
      {/* <Section /> */}
    </div>
  );
}

export default ArchiveDetail;
