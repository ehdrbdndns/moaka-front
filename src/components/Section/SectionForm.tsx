import React from 'react';
import {
  Container,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import ChunkForm from '../Chunk/ChunkForm';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import {
  DeleteSectionModal,
  MakeSectionModal,
  UpdateSectionModal,
} from './SectionModal';
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
import { useEffect } from 'react';
import { MakeChunkModal } from '../Chunk/ChunkModal';
import { insertCommentOfChunkRequest } from '../../apis/comment/types';

const barStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

type sectionFormProps = {
  loading: boolean;
  error: string;
  archive_no: number;
  section_list: Array<sectionInfo>;
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
  makeRelativeChunkRedux: (relativeChunkInfo: relativeChunkInfo) => void;
  deleteRelativeChunkRedux: (
    deleteRelativeChunkActionType: deleteRelativeChunkActionType,
  ) => void;
  setCommentRedux: (commentInfo: insertCommentOfChunkRequest) => void;
  deleteCommentRedux: (
    deleteCommentActionType: deleteCommentActionType,
  ) => void;
};

function SectionForm({
  loading,
  error,
  archive_no,
  section_list,
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
  makeRelativeChunkRedux,
  deleteRelativeChunkRedux,
  setCommentRedux,
  deleteCommentRedux,
}: sectionFormProps) {
  const barClasses = barStyles();

  useEffect(() => {
    getSectionRedux(archive_no);
  }, [archive_no, getSectionRedux]);

  return (
    <>
      <MakeSectionModal
        makeSectionRedux={makeSectionRedux}
        archive_no={archive_no}
        loading={loading}
      />
      {section_list.map(section => (
        <>
          <AppBar position="static" key={section.no}>
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                className={barClasses.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                {section.title}
              </Typography>
              <DeleteSectionModal
                section_no={section.no || 0}
                deleteSectionRedux={deleteSectionRedux}
                loading={loading}
              />
              <UpdateSectionModal
                section_no={section.no || 0}
                updateSectionRedux={updateSectionRedux}
                loading={loading}
                description_prop={section.description}
                title_prop={section.title}
                section_tag_list={section.tag_list}
              />
            </Toolbar>
          </AppBar>
          <Container>
            <MakeChunkModal
              section_no={section.no || 0}
              section_tag_list={section.tag_list}
              makeChunkRedux={makeChunkRedux}
            />
            <Box my={2}>
              <Grid container spacing={3}>
                {section.chunk_list?.length !== 0 ? (
                  section.chunk_list?.map(chunk => (
                    <Grid key={chunk.no} item lg={3} sm={6} xs={12}>
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
          </Container>
        </>
      ))}
    </>
  );
}

export default SectionForm;
