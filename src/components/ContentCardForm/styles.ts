import { makeStyles } from '@material-ui/core';

const AddContentStyles = makeStyles(theme => ({
  modalBox: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export { AddContentStyles };
