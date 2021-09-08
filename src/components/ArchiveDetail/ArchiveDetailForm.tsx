import React, { useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DetailView from '../DetailView/DetailView';
import { Box, Button, Container, Grid, makeStyles } from '@material-ui/core';
import { archiveInfo } from '../../modules/archive';
import {
  bookmarkActionType,
  chunkInfo,
  deleteChunkActionType,
  likeActionType,
  sectionInfo,
} from '../../modules/section';
import {
  DeleteSectionModal,
  UpdateSectionModal,
} from '../Section/SectionModal';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { MakeChunkModal } from '../Chunk/ChunkModal';
import ChunkForm from '../Chunk/ChunkForm';

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
  makeSectionRedux: (sectionInfo: sectionInfo) => void;
  deleteSectionRedux: (section_no: number) => void;
  getSectionRedux: (archive_no: number) => void;
  updateSectionRedux: (sectionInfo: sectionInfo) => void;
  deleteChunkRedux: (deleteChunkActionType: deleteChunkActionType) => void;
  makeChunkRedux: (chunkInfo: chunkInfo) => void;
  updateChunkRedux: (chunkInfo: chunkInfo) => void;
  setBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  deleteBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  setLikeRedux: (likeActionType: likeActionType) => void;
  deleteLikeRedux: (likeActionType: likeActionType) => void;
};

function ArchiveDetailForm({
  section_loading,
  section_error,
  section_list,
  archive_info,
  archive_loading,
  archive_error,
  makeSectionRedux,
  updateSectionRedux,
  deleteSectionRedux,
  getSectionRedux,
  deleteChunkRedux,
  makeChunkRedux,
  updateChunkRedux,
  setBookmarkRedux,
  deleteBookmarkRedux,
  setLikeRedux,
  deleteLikeRedux,
}: ArchiveDetailProps) {
  const classes = archiveDetailStyles();

  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    if (query.no !== null) {
      getSectionRedux(+query.no);
    }
  }, [archive_info.no, getSectionRedux, query.no]);
  return (
    <>
      {section_list.map(section => (
        <>
          <AppBar position="static" key={section.no}>
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
        </>
      ))}
    </>
  );
}

export default ArchiveDetailForm;
