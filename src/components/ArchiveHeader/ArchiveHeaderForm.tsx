import React, { useEffect } from 'react';
import { CircularProgress, IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import {
  archiveBookmarkActionType,
  archiveInfo,
  archiveLikeActionType,
  deleteArchiveLike,
} from '../../modules/archive';

const archiveHeaderStyles = makeStyles(theme => ({
  archiveProfile: {
    backgroundColor: 'white',
    backgroundImage: 'radial-gradient(#7a84dc 10%, transparent 0%)',
    backgroundPosition: '0 0, 30px 30px',
    backgroundSize: '10px 10px',
    width: '100%',
    height: '200px',
    opacity: '0.8',
    textAlign: 'center',
    position: 'relative',
  },
  archiveTitle: {
    position: 'relative',
    top: '50px',
    fontSize: '30px',
  },
  archiveDesc: {
    position: 'relative',
    top: '50px',
  },
  archiveBtnBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
}));

type ArchiveHeaderProps = {
  archive_info: archiveInfo;
  loading: boolean;
  error: string;
  getArchiveRedux: (archive_no: number) => void;
  setArchiveLikeRedux: (likeInfo: archiveLikeActionType) => void;
  deleteArchiveLikeRedux: (likeInfo: archiveLikeActionType) => void;
  setArchiveBookmarkRedux: (bookmarkInfo: archiveBookmarkActionType) => void;
  deleteArchiveBookmarkRedux: (bookmarkInfo: archiveBookmarkActionType) => void;
};

function ArchiveHeaderForm({
  archive_info,
  loading,
  error,
  getArchiveRedux,
  setArchiveLikeRedux,
  deleteArchiveLikeRedux,
  setArchiveBookmarkRedux,
  deleteArchiveBookmarkRedux,
}: ArchiveHeaderProps) {
  const classes = archiveHeaderStyles();

  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    if (query.no !== null) {
      getArchiveRedux(+query.no);
    }
  }, [getArchiveRedux, query.no]);

  const setLikeEvent = () => {
    if (query.no !== null) {
      const likeInfo: archiveLikeActionType = {
        archive_no: +query.no,
        like_no: 0,
      };
      setArchiveLikeRedux(likeInfo);
    }
  };

  const deleteLikeEvent = () => {
    if (query.no !== null) {
      const likeInfo: archiveLikeActionType = {
        archive_no: +query.no,
        like_no: archive_info.like_no,
      };
      deleteArchiveLikeRedux(likeInfo);
    }
  };

  const setBookmarkEvent = () => {
    if (query.no !== null) {
      const bookmarkInfo: archiveBookmarkActionType = {
        archive_no: +query.no,
        bookmark_no: 0,
      };
      setArchiveBookmarkRedux(bookmarkInfo);
    }
  };

  const deleteBookmarkEvent = () => {
    if (query.no !== null) {
      const bookmarkInfo: archiveBookmarkActionType = {
        archive_no: +query.no,
        bookmark_no: archive_info.bookmark_no,
      };
      deleteArchiveBookmarkRedux(bookmarkInfo);
    }
  };

  return (
    <div className={classes.archiveProfile}>
      {archive_info ? (
        <>
          <div className={classes.archiveTitle}>{archive_info.title}</div>
          <div className={classes.archiveDesc}>{archive_info.description}</div>
          <div className={classes.archiveBtnBox}>
            {/* REF 아카이브 좋아요 */}
            {archive_info.like_no ? (
              <IconButton aria-label="favorites" onClick={deleteLikeEvent}>
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="favorites" onClick={setLikeEvent}>
                <FavoriteBorderIcon />
              </IconButton>
            )}
            {/* REF 아카이브 북마크 */}
            {archive_info.bookmark_no ? (
              <IconButton aria-label="bookMark" onClick={deleteBookmarkEvent}>
                <BookmarkIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="bookMark" onClick={setBookmarkEvent}>
                <BookmarkBorderIcon />
              </IconButton>
            )}
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default ArchiveHeaderForm;
