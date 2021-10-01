import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';
import { archiveInfo } from '../../modules/archive';
import { useHistory } from 'react-router';
import { nanoid } from 'nanoid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

type ArchiveCardProps = {
  archive_info: archiveInfo;
};

function ArchiveCardForm({ archive_info }: ArchiveCardProps) {
  const classes = useStyles();
  const { push } = useHistory();

  const onMoveLikeEvent = () => {
    push({
      pathname: '/archive/detail',
      search: '?no=' + archive_info.no,
      state: { archive_info },
    });
  };

  return (
    <Card className={classes.root} onClick={onMoveLikeEvent}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {archive_info.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {archive_info.creator_name}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {archive_info.tag_list?.map(tag => (
            <Chip
              key={nanoid()}
              color="primary"
              label={tag}
              size="small"
              clickable
            />
          ))}
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={archive_info.thumbnail}
        title="Live from space album cover"
      />
    </Card>
  );
}

export default ArchiveCardForm;
