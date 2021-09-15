import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Navigation from '../components/Navigation/Navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'relative',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: '90px',
      display: 'flex',
    },
  }),
);

function MyPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}></main>
    </div>
  );
}

export default MyPage;
