import React, { useState } from 'react';
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
import CardForm from '../Chunk/ChunkForm';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { DeleteSectionModal, MakeSectionModal } from './SectionModal';
import { sectionInfo } from '../../modules/section';

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
  section_no: number;
  archive_no: number;
  makeSectionRedux: (sectionInfo: sectionInfo) => void;
  deleteSectionRedux: (section_no: number) => void;
};

function SectionForm({
  loading,
  error,
  section_no,
  archive_no,
  makeSectionRedux,
  deleteSectionRedux,
}: sectionFormProps) {
  const barClasses = barStyles();

  return (
    <>
      <Container maxWidth="lg">
        <MakeSectionModal
          makeSectionRedux={makeSectionRedux}
          archive_no={archive_no}
          loading={loading}
        />
        <AppBar position="static">
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
              섹션 제목이여~
            </Typography>
            <DeleteSectionModal
              section_no={section_no}
              deleteSectionRedux={deleteSectionRedux}
              loading={loading}
            />
          </Toolbar>
        </AppBar>
        <Container>
          <Box my={2}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <CardForm />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
      {/* <Container maxWidth="lg"></Container> */}
    </>
  );
}

export default SectionForm;
