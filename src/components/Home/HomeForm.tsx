import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArchiveCardForm from '../Archive/ArchiveCardForm';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { archiveInfo } from '../../modules/archive/types';
import { useHistory } from 'react-router';
import {
  bookmarkActionType,
  chunkInfo,
  deleteChunkActionType,
  deleteCommentActionType,
  deleteRelativeChunkActionType,
  likeActionType,
  relativeChunkInfo,
  sectionInfo,
} from '../../modules/section';
import { insertCommentOfChunkRequest } from '../../apis/comment/types';
import ChunkForm from '../Chunk/ChunkForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

type HomeFromProps = {
  loading: boolean;
  error: string | null;
  archive_info_data: Array<archiveInfo>;
  section_list: Array<sectionInfo>;
  section_loading: boolean;
  deleteChunkRedux: (deleteChunkActionType: deleteChunkActionType) => void;
  updateChunkRedux: (chunkInfo: chunkInfo) => void;
  setBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  deleteBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  setLikeRedux: (likeActionType: likeActionType) => void;
  deleteLikeRedux: (likeActionType: likeActionType) => void;
  makeRelativeChunkRedux: (relativeChunkInfo: relativeChunkInfo) => void;
  deleteRelativeChunkRedux: (
    deleteRelativeChunkActionType: deleteRelativeChunkActionType,
  ) => void;
  setCommentRedux: (commentInfo: insertCommentOfChunkRequest) => void;
  deleteCommentRedux: (
    deleteCommentActionType: deleteCommentActionType,
  ) => void;
};

function HomeForm({
  loading,
  error,
  archive_info_data,
  section_loading,
  section_list,
  deleteChunkRedux,
  updateChunkRedux,
  setBookmarkRedux,
  deleteBookmarkRedux,
  setLikeRedux,
  deleteLikeRedux,
  makeRelativeChunkRedux,
  deleteRelativeChunkRedux,
  setCommentRedux,
  deleteCommentRedux,
}: HomeFromProps) {
  const classes = useStyles();

  const { push } = useHistory();

  useEffect(() => {
    if (error === '404') {
      alert('로그인해주세요.');
      push('/login');
    }
  }, [error, push]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            TOP 3 추천 아카이브
          </Typography>
        </Toolbar>
      </AppBar>
      <Box my={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {archive_info_data.map(
              archive =>
                archive.type === 'top' && (
                  <Grid key={archive.no} item lg={3} sm={6} xs={12}>
                    <ArchiveCardForm archive_info={archive} />
                  </Grid>
                ),
            )}
          </Grid>
        )}
      </Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            내 북마크 아카이브
          </Typography>
        </Toolbar>
      </AppBar>
      <Box my={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {archive_info_data.map(
              archive =>
                archive.type === 'bookmark' && (
                  <Grid key={archive.no} item lg={3} sm={6} xs={12}>
                    <ArchiveCardForm archive_info={archive} />
                  </Grid>
                ),
            )}
          </Grid>
        )}
      </Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            내 소속 관련 아카이브
          </Typography>
        </Toolbar>
      </AppBar>
      <Box my={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {archive_info_data.map(
              archive =>
                archive.type === 'group' && (
                  <Grid key={archive.no} item lg={3} sm={6} xs={12}>
                    <ArchiveCardForm archive_info={archive} />
                  </Grid>
                ),
            )}
          </Grid>
        )}
      </Box>
      {section_loading ||
        section_list.map(section => (
          <div key={section.no}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                  {section.title}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box my={2}>
              <Grid container spacing={2}>
                {section.chunk_list?.length !== 0 ? (
                  section.chunk_list?.map(chunk => (
                    <Grid key={chunk.no} item lg={2} md={3} sm={4} xs={6}>
                      {/* 청크 카드 */}
                      <ChunkForm
                        chunk_info={chunk}
                        section_no={section.no || 0}
                        section_tag_list={section.tag_list}
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
                    </Grid>
                  ))
                ) : (
                  <Typography variant="h1" color="textSecondary" align="center">
                    정보가 존재하지 않습니다.
                  </Typography>
                )}
              </Grid>
            </Box>
          </div>
        ))}
    </div>
  );
}

export default HomeForm;
