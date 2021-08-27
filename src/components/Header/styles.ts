import { makeStyles } from '@material-ui/core';

const headerStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '60px',
  },
  toolbarTitle: {
    flex: 1,
    position: 'relative',
    marginLeft: '486px',
  },
  toolbarSecondary: {
    height: '60px',
    justifyContent: 'center',
    // overflowX: '50px',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    fontSize: '20px',
    color: 'inherit',
    textDecoration: 'none',
  },
  signButton: {
    fontSize: '20px',
    color: 'inherit',
    textDecoration: 'none',
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 30,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '15px',
  },
  searchButton: {
    padding: 10,
  },
}));

export { headerStyles };
