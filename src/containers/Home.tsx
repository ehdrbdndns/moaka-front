import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertCommentOfChunkRequest } from '../apis/comment/types';
import BannerForm from '../components/Banner/BannerForm';
import HomeForm from '../components/Home/HomeForm';
import { RootState } from '../modules';
import { getHomeArchiveList } from '../modules/archive';
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
  getBookmarkChunk,
  likeActionType,
  makeRelativeChunk,
  relativeChunkInfo,
  setBookmark,
  setComment,
  setLike,
  updateChunk,
} from '../modules/section';

function Home() {
  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);
  const sectionInfo = useSelector((state: RootState) => state.section);

  const deleteChunkRedux = useCallback(
    (deleteChunkInfo: deleteChunkActionType) => {
      dispatch(deleteChunk(deleteChunkInfo));
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
    dispatch(getHomeArchiveList());
    dispatch(getBookmarkChunk());
  }, [dispatch]);

  return (
    <>
      <BannerForm />
      <HomeForm
        loading={archive_info.loading}
        error={archive_info.error}
        archive_info_data={archive_info.data}
        section_list={sectionInfo.data}
        section_loading={sectionInfo.loading}
        deleteChunkRedux={deleteChunkRedux}
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
    </>
  );
}

export default Home;
