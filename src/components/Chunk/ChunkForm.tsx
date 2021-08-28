import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DeleteChunkModal, UpdateChunkModal } from './ChunkModal';

const cardStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

type chunkFormProps = {
  no: number;
  section_no: number;
  title: string;
  thumbnail: string;
  link: string;
  link_title: string;
  link_description: string;
  description: string;
  regdate: string;
};

function ChunkForm({
  no,
  title,
  thumbnail,
  link,
  link_title,
  link_description,
  description,
  regdate,
}: chunkFormProps) {
  const classes = cardStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '15ch',
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <UpdateChunkModal
                  link={link}
                  title={title}
                  description={description}
                />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <DeleteChunkModal />
              </MenuItem>
            </Menu>
          </>
        }
        title={title}
        subheader={regdate}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        title={link_title}
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="p">
          {link_title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {link_description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="bookMark">
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>description</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ChunkForm;
