import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { archiveInfo } from '../../modules/archive';
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
import {
  DeleteSectionModal,
  MakeSectionModal,
  UpdateSectionModal,
} from '../Section/SectionModal';
import { MakeChunkModal } from '../Chunk/ChunkModal';
import ChunkForm from '../Chunk/ChunkForm';
import { userInfo } from '../../modules/auth';
import { insertCommentOfChunkRequest } from '../../apis/comment/types';

const archiveDetailStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: '#7a84dc',
  },
  title: {
    flexGrow: 1,
  },
  addContentButton: {
    backgroundColor: 'white',
    color: '#7a84dc',
    fontSize: '14px',
    width: '138px',
    height: '34px',
  },
  toolbarBtnBox: {
    display: 'flex',
  },
}));

type ArchiveDetailProps = {
  section_loading: boolean;
  section_error: string;
  section_list: Array<sectionInfo>;
  archive_loading: boolean;
  archive_error: string;
  archive_info: archiveInfo;
  user_info: userInfo;
  makeSectionRedux: (sectionInfo: sectionInfo) => void;
  deleteSectionRedux: (section_no: number) => void;
  updateSectionRedux: (sectionInfo: sectionInfo) => void;
  deleteChunkRedux: (deleteChunkActionType: deleteChunkActionType) => void;
  makeChunkRedux: (chunkInfo: chunkInfo) => void;
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

function ArchiveDetailForm({
  section_loading,
  section_error,
  section_list,
  archive_info,
  archive_loading,
  archive_error,
  user_info,
  makeSectionRedux,
  updateSectionRedux,
  deleteSectionRedux,
  deleteChunkRedux,
  makeChunkRedux,
  updateChunkRedux,
  setBookmarkRedux,
  deleteBookmarkRedux,
  setLikeRedux,
  deleteLikeRedux,
  makeRelativeChunkRedux,
  deleteRelativeChunkRedux,
  setCommentRedux,
  deleteCommentRedux,
}: ArchiveDetailProps) {
  const classes = archiveDetailStyles();

  return (
    <>
      {archive_info && archive_info.user_no === user_info.no && (
        <MakeSectionModal
          makeSectionRedux={makeSectionRedux}
          archive_no={archive_info.no}
          loading={section_loading}
        />
      )}
      {archive_info ? (
        section_list.map(section => (
          <div key={section.no}>
            <AppBar position="static">
              <Toolbar variant="dense" className={classes.toolbar}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  {section.title}
                </Typography>
                {user_info.no === archive_info.user_no && (
                  <div className={classes.toolbarBtnBox}>
                    <DeleteSectionModal
                      section_no={section.no || 0}
                      deleteSectionRedux={deleteSectionRedux}
                      loading={section_loading}
                    />
                    <UpdateSectionModal
                      section_no={section.no || 0}
                      updateSectionRedux={updateSectionRedux}
                      loading={section_loading}
                      description_prop={section.description}
                      title_prop={section.title}
                      section_tag_list={section.tag_list}
                    />
                  </div>
                )}
              </Toolbar>
            </AppBar>
            <MakeChunkModal
              section_no={section.no || 0}
              section_tag_list={section.tag_list}
              makeChunkRedux={makeChunkRedux}
            />
            <Box my={2}>
              <Grid container spacing={2}>
                {section.chunk_list?.length !== 0 ? (
                  section.chunk_list?.map(chunk => (
                    <Grid key={chunk.no} item lg={2} md={3} sm={4} xs={6}>
                      {/* 청크 카드 */}
                      <ChunkForm
                        chunk_info={chunk}
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
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default ArchiveDetailForm;
