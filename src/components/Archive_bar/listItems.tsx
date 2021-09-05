import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';

const folders = ['folder1', 'folder2', 'folder3'];

export const mainListItems = folders.map(folder => (
  <div>
    <Link to="/archive/detail">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={folder} />
      </ListItem>
    </Link>
  </div>
));
