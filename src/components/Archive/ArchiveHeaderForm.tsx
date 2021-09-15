import React, { useState } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  makeStyles,
  Modal,
} from '@material-ui/core';
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
} from '../../modules/archive';
import { userInfo } from '../../modules/auth';

const archiveHeaderStyles = makeStyles(theme => ({
  archiveProfile: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    width: '100%',
    height: '250px',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '350px',
  },
}));

type ArchiveHeaderProps = {
  archive_info: archiveInfo;
  user_info: userInfo;
  loading: boolean;
  error: string;
  getArchiveRedux: (archive_no: number) => void;
  setArchiveLikeRedux: (likeInfo: archiveLikeActionType) => void;
  deleteArchiveLikeRedux: (likeInfo: archiveLikeActionType) => void;
  setArchiveBookmarkRedux: (bookmarkInfo: archiveBookmarkActionType) => void;
  deleteArchiveBookmarkRedux: (bookmarkInfo: archiveBookmarkActionType) => void;
  setUserRedux: () => void;
  deleteArchiveRedux: (archive_no: number) => void;
};

function ArchiveHeaderForm({
  archive_info,
  user_info,
  loading,
  error,
  getArchiveRedux,
  setArchiveLikeRedux,
  deleteArchiveLikeRedux,
  setArchiveBookmarkRedux,
  deleteArchiveBookmarkRedux,
  deleteArchiveRedux,
}: ArchiveHeaderProps) {
  const classes = archiveHeaderStyles();

  const location = useLocation();
  const query = queryString.parse(location.search);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteArchiveEvent = () => {
    if (query.no !== null) {
      deleteArchiveRedux(+query.no);
    }
  };

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
    <>
      {archive_info ? (
        <div
          className={classes.archiveProfile}
          style={{
            backgroundImage: `url(${archive_info.thumbnail})`,
          }}
        >
          <img src="" alt="" />
          <>
            <div className={classes.archiveTitle}>{archive_info.title}</div>
            <div className={classes.archiveDesc}>
              {archive_info.description}
            </div>
            <div className={classes.archiveBtnBox}>
              {/* REF 아카이브 삭제 */}
              {archive_info.user_no === user_info.no && (
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={handleOpen} />
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <h2 id="transition-modal-title">섹션 삭제</h2>
                        <p id="transition-modal-description">
                          정말 저장소를 삭제하시겠습니까?
                        </p>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={deleteArchiveEvent}
                        >
                          예
                        </Button>
                        <Button
                          onClick={handleClose}
                          variant="contained"
                          color="secondary"
                        >
                          아니요
                        </Button>
                      </div>
                    </Fade>
                  </Modal>
                </IconButton>
              )}
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
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default ArchiveHeaderForm;
