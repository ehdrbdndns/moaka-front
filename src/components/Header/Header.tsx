import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { headerStyles } from './styles';
import { HeaderProps } from './types';

function Header(props: HeaderProps) {
  const classes = headerStyles();
  const { title, loginStatus } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>

        <IconButton>
          <SearchIcon />
        </IconButton>
        {loginStatus ? (
          <Link to="/mypage">
            <Avatar src="/broken-image.jpg" />
          </Link>
        ) : (
          <div>
            <Link to="/register" className={classes.signButton}>
              <Button variant="outlined" size="small">
                Sign-up
              </Button>
            </Link>
            <Link to="/login" className={classes.signButton}>
              <Button variant="outlined" size="small">
                Sign-in
              </Button>
            </Link>
          </div>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link to={'/'} className={classes.toolbarLink}>
          Home
        </Link>
        <Link to={'/mypage'} className={classes.toolbarLink}>
          Mypage
        </Link>
        <Link to={'/archive/main'} className={classes.toolbarLink}>
          Archive
        </Link>
      </Toolbar>
      <Divider />
    </React.Fragment>
  );
}
export default Header;
