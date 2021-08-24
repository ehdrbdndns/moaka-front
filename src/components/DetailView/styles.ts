import { makeStyles } from '@material-ui/core';

const detailStyles = makeStyles(theme => ({
  detailViewLayout: {
    width: '100%',
    position: 'relative',
    top: '64px',
    height: 'fit-content',
  },
  detailHeader: {
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    height: '50px',
    display: 'flex',
    marginLeft: '20px',
    paddingRight: '30px',
    justifyContent: 'space-between',
  },
  addContentButton: {
    backgroundColor: 'white',
    color: '#7a84dc',
    fontSize: '14px',
    width: '138px',
    height: '34px',
  },
  contentsTag: {
    width: '100%',
    position: 'relative',

    height: '40px',
  },
  contents: {
    width: '100%',
    position: 'relative',
    height: '300px',
  },
  chipRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export { detailStyles };
