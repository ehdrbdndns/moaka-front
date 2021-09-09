import React, { useEffect } from 'react';
import { CircularProgress, IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { archiveInfo } from '../../modules/archive';

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
};

function ArchiveHeaderForm({
  getArchiveRedux,
  archive_info,
  loading,
  error,
}: ArchiveHeaderProps) {
  const classes = archiveHeaderStyles();

  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    if (query.no !== null) {
      getArchiveRedux(+query.no);
    }
  }, [getArchiveRedux, query.no]);

  return (
    <div className={classes.archiveProfile}>
      {archive_info ? (
        <>
          <div className={classes.archiveTitle}>{archive_info.title}</div>
          <div className={classes.archiveDesc}>{archive_info.description}</div>
          <div className={classes.archiveBtnBox}>
            {/* REF 아카이브 삭제 */}
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
            {/* REF 아카이브 좋아요 */}
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            {/* REF 아카이브 북마크 */}
            <IconButton aria-label="bookMark">
              <BookmarkIcon />
            </IconButton>
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default ArchiveHeaderForm;
