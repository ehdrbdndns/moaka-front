import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import ArchiveDetailForm from '../components/Archive/ArchiveDetailForm';
import ArchiveHeaderForm from '../components/Archive/ArchiveHeaderForm';
import { RootState } from '../modules';
import {
  archiveBookmarkActionType,
  archiveLikeActionType,
  deleteArchive,
  deleteArchiveBookmark,
  deleteArchiveLike,
  getArchive,
  setArchiveBookmark,
  setArchiveLike,
  updateArchive,
} from '../modules/archive';
import {
  bookmarkActionType,
  chunkInfo,
  deleteBookmark,
  deleteChunk,
  deleteChunkActionType,
  deleteComment,
  deleteCommentActionType,
  deleteLike,
  deleteRelativeChunk,
  deleteRelativeChunkActionType,
  deleteSection,
  getSection,
  likeActionType,
  makeChunk,
  makeRelativeChunk,
  makeSection,
  relativeChunkInfo,
  sectionInfo,
  setBookmark,
  setComment,
  setLike,
  updateChunk,
  updateSection,
} from '../modules/section';
import queryString from 'query-string';
import { insertCommentOfChunkRequest } from '../apis/comment/types';
import { updateArchiveRequest } from '../apis/archives/types';
import { searchUserList } from '../modules/userList';

function ArchiveDetail() {
  const dispatch = useDispatch();
  const sectionInfo = useSelector((state: RootState) => state.section);
  const archiveInfo = useSelector((state: RootState) => state.archive);
  const userInfo = useSelector((state: RootState) => state.auth);
  const userList = useSelector((state: RootState) => state.userList);

  const location = useLocation();
  const query = queryString.parse(location.search);

  const { push } = useHistory();

  const searchUserListRedux = (id: string) => {
    dispatch(searchUserList(id));
  };

  const updateArchiveRedux = useCallback(
    (updateArchiveRequest: updateArchiveRequest) => {
      dispatch(updateArchive(updateArchiveRequest));
    },
    [dispatch],
  );

  const deleteArchiveRedux = useCallback(
    (archive_no: number) => {
      dispatch(deleteArchive(archive_no));
    },
    [dispatch],
  );

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

  const makeRelativeChunkRedux = useCallback(
    (relativeChunkInfo: relativeChunkInfo) => {
      dispatch(makeRelativeChunk(relativeChunkInfo));
    },
    [dispatch],
  );

  const deleteRelativeChunkRedux = useCallback(
    (deleteRelativeChunkActionType: deleteRelativeChunkActionType) => {
      dispatch(deleteRelativeChunk(deleteRelativeChunkActionType));
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

  const setCommentRedux = useCallback(
    (commentInfo: insertCommentOfChunkRequest) => {
      dispatch(setComment(commentInfo));
    },
    [dispatch],
  );

  const deleteCommentRedux = useCallback(
    (deleteCommentActionType: deleteCommentActionType) => {
      dispatch(deleteComment(deleteCommentActionType));
    },
    [dispatch],
  );

  useEffect(() => {
    if (query.no !== null) {
      getArchiveRedux(+query.no);
      getSectionRedux(+query.no);
    }
  }, [getArchiveRedux, getSectionRedux, query.no]);

  // TODO 아카이브 삭제시 실행되는 로직
  const archivePrevLoading = useRef<boolean>(false);
  useEffect(() => {
    if (!archiveInfo.loading && archivePrevLoading.current) {
      archiveInfo.data[0] || push('/');
    } else {
      archivePrevLoading.current = archiveInfo.loading;
    }
  }, [archiveInfo.loading, archiveInfo.data, push]);

  return (
    <div>
      <ArchiveHeaderForm
        archive_info={archiveInfo.data[0]}
        user_info={userInfo.data}
        search_user_list={userList}
        searchUserListRedux={searchUserListRedux}
        setArchiveLikeRedux={setArchiveLikeRedux}
        deleteArchiveLikeRedux={deleteArchiveLikeRedux}
        setArchiveBookmarkRedux={setArchiveBookmarkRedux}
        deleteArchiveBookmarkRedux={deleteArchiveBookmarkRedux}
        deleteArchiveRedux={deleteArchiveRedux}
        updateArchiveRedux={updateArchiveRedux}
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
        makeSectionRedux={makeSectionRedux}
        deleteChunkRedux={deleteChunkRedux}
        makeChunkRedux={makeChunkRedux}
        updateChunkRedux={updateChunkRedux}
        setBookmarkRedux={setBookmarkRedux}
        deleteBookmarkRedux={deleteBookmarkRedux}
        setLikeRedux={setLikeRedux}
        deleteLikeRedux={deleteLikeRedux}
        makeRelativeChunkRedux={makeRelativeChunkRedux}
        deleteRelativeChunkRedux={deleteRelativeChunkRedux}
        setCommentRedux={setCommentRedux}
        deleteCommentRedux={deleteCommentRedux}
      />
    </div>
  );
}

export default ArchiveDetail;
