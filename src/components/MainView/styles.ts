import { makeStyles } from '@material-ui/core';

const mainStyles = makeStyles(theme => ({
  mainViewLayout: {
    width: '100%',
    position: 'relative',
    top: '64px',
    height: 'fit-content',
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: 'white',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'img/moaka_korean_logo.png',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#7a84dc',
    width: '40%',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    color: 'black',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export { mainStyles };
