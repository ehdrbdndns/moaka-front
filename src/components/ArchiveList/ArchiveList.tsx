import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { archiveListStyles } from './styles';
import { archiveListProps } from './types';

export default function ArchiveList(props: archiveListProps) {
  const classes = archiveListStyles();
  const { archiveList } = props;
  return (
    <div className={classes.layout}>
      {archiveList.map(archive => (
        <Card className={classes.root}>
          <CardActionArea className={classes.cardAction}>
            <CardMedia
              className={classes.media}
              image="img/moaka_korean_logo.png"
              title="Contemplative Reptile"
            />
            <div>
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h6" component="h3">
                  {archive.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {archive.description}
                </Typography>
              </CardContent>
              {archive.tag_list.map(hashtag => (
                <Chip variant="outlined" label={hashtag} color="primary"></Chip>
              ))}
            </div>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
