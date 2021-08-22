import React from 'react';
import {
  Container,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import CardForm from '../Card/CardForm';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

const menuStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

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

function ArchiveListForm() {
  const classes = barStyles();

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              아카이브 제목이여~
            </Typography>
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

export default ArchiveListForm;
