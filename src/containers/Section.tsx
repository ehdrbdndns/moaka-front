import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionForm from '../components/Section/SectionForm';
import { RootState } from '../modules';
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

function Section() {
  const dispatch = useDispatch();
  const sectionInfo = useSelector((state: RootState) => state.section);

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
        setBookmarkRedux={setBookmarkRedux}
        deleteBookmarkRedux={deleteBookmarkRedux}
        setLikeRedux={setLikeRedux}
        deleteLikeRedux={deleteLikeRedux}
        // FIXME 아카이브 고유 번호는 추후 디비로부터 가져와야 함
        archive_no={1}
      />
    </>
  );
}

export default Section;
