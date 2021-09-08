import { makeStyles } from '@material-ui/core/styles';

const archiveListStyles = makeStyles({
  layout: {},
  root: {
    maxWidth: 700,
  },
  cardAction: {
    display: 'flex',
    height: 180,
  },
  media: {
    width: '100%',
    maxwidth: 300,
    height: 170,
  },
  content: {
    width: 400,
  },
});

export { archiveListStyles };
