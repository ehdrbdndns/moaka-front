import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const profileStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      display: 'flex',

      width: '420px',
      height: '330px',
    },
    formControl: {
      margin: theme.spacing(3),
      width: '280px',
    },
    saveButton: {
      position: 'relative',
      top: '274px',
      left: '2px',
    },
    editButton: {
      position: 'relative',
      top: '20px',
      left: '-78px',
    },
  }),
);

export { profileStyles };
