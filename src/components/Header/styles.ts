import { makeStyles } from '@material-ui/core';

const headerStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '60px',
  },
  toolbarTitle: {
    flex: 1,
    position: 'relative',
    marginLeft: '116px',
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
}));

export { headerStyles };
