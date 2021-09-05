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
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DeleteChunkModal, UpdateChunkModal } from './ChunkModal';
import {
  bookmarkActionType,
  chunkInfo,
  deleteChunkActionType,
  likeActionType,
} from '../../modules/section';
import { CircularProgress } from '@material-ui/core';

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
  chunk_info: chunkInfo;
  section_tag_list: string[];
  deleteChunkRedux: (deleteChunkActionType: deleteChunkActionType) => void;
  updateChunkRedux: (chunkInfo: chunkInfo) => void;
  setBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  deleteBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  setLikeRedux: (likeActionType: likeActionType) => void;
  deleteLikeRedux: (likeActionType: likeActionType) => void;
};

function ChunkForm({
  chunk_info,
  section_tag_list,
  deleteChunkRedux,
  updateChunkRedux,
  setBookmarkRedux,
  deleteBookmarkRedux,
  setLikeRedux,
  deleteLikeRedux,
}: chunkFormProps) {
  const {
    no,
    section_no,
    title,
    thumbnail,
    link,
    link_title,
    link_description,
    description,
    regdate,
    tag_list,
    bookmark_no,
    bookmark_loading,
    like_no,
    like_loading,
  } = chunk_info;

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

  const deleteChunk = () => {
    deleteChunkRedux({
      chunk_no: no,
      section_no,
    });
  };

  const setBookmarkEvent = () => {
    const bookmarkActionType: bookmarkActionType = {
      bookmark_no: 0,
      chunk_no: no,
      section_no: section_no,
    };

    setBookmarkRedux(bookmarkActionType);
  };

  const deleteBookmarkEvent = () => {
    const bookmarkActionType: bookmarkActionType = {
      bookmark_no: bookmark_no,
      chunk_no: no,
      section_no: section_no,
    };

    deleteBookmarkRedux(bookmarkActionType);
  };

  const setLikeEvent = () => {
    const likeActionType: likeActionType = {
      like_no: 0,
      chunk_no: no,
      section_no: section_no,
    };

    setLikeRedux(likeActionType);
  };

  const deleteLikeEvent = () => {
    const likeActionType: likeActionType = {
      like_no: like_no,
      chunk_no: no,
      section_no: section_no,
    };

    deleteLikeRedux(likeActionType);
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
                  chunk_no={no}
                  _url={link}
                  _title={title}
                  _description={description}
                  chunk_tag_list={tag_list}
                  section_tag_list={section_tag_list}
                  updateChunkRedux={updateChunkRedux}
                  section_no={section_no}
                />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <DeleteChunkModal deleteChunk={deleteChunk} />
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
        {/* REF 좋아요 */}
        <IconButton aria-label="add to favorites">
          {like_loading ? (
            <CircularProgress />
          ) : like_no ? (
            <FavoriteIcon onClick={deleteLikeEvent} />
          ) : (
            <FavoriteBorderIcon onClick={setLikeEvent} />
          )}
        </IconButton>
        {/* REF 북마크 */}
        <IconButton aria-label="bookMark">
          {bookmark_loading ? (
            <CircularProgress />
          ) : bookmark_no ? (
            <BookmarkIcon onClick={deleteBookmarkEvent} />
          ) : (
            <BookmarkBorderIcon onClick={setBookmarkEvent} />
          )}
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
