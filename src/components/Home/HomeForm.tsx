import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArchiveCardForm from '../Archive/ArchiveCardForm';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { archiveInfo } from '../../modules/archive/types';
import { useHistory } from 'react-router';

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
  getGroupArchiveListRedux: () => void;
};

function HomeForm({
  loading,
  error,
  archive_info_data,
  getGroupArchiveListRedux,
}: HomeFromProps) {
  const classes = useStyles();

  const { push } = useHistory();

  useEffect(() => {
    getGroupArchiveListRedux();
  }, [getGroupArchiveListRedux]);

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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
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
            {archive_info_data.map(archive => (
              <Grid key={archive.no} item lg={3} sm={6} xs={12}>
                <ArchiveCardForm archive_info={archive} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default HomeForm;
