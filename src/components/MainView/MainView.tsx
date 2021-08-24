import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { mainStyles } from './styles';
import { mainProps } from './types';

export default function MainView(props: mainProps) {
  const classes = mainStyles();

  return (
    <div className={classes.mainViewLayout}>
      <Paper
        className={classes.mainFeaturedPost}
        // style={{ backgroundImage: 'img/moaka_korean_logo.png' }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: 'none' }}
            src="img/moaka_korean_logo.png"
            alt="archive profile img"
          />
        }
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {'Archive Title'}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {'Archive Description: 아카이브 설명입니다.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
