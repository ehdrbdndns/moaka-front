import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import { myPageStyles } from './styles';
import DashboardProps from './types';
import MainView from '../MainView/MainView';
import DetailView from '../DetailView/DetailView';

export default function ArchiveBar(props: DashboardProps) {
  const classes = myPageStyles();
  const [open, setOpen] = React.useState(true);
  const { view } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.archiveProfile}>
        <div className={classes.archiveTitle}>개발자들을 위한 꿀팁</div>
        <div className={classes.archiveDesc}>
          개발자들을 위한 꿀팁을 모아둔 아카이브 입니다. 누구나 참여 가능합니다.
        </div>
      </div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Archive
            </Typography>

            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.folderLink}>{mainListItems}</List>
          <Divider />
        </Drawer>
        {view === 'main' ? <MainView /> : <DetailView />}
      </div>
    </div>
  );
}
