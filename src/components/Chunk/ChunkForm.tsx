import React, { useState } from 'react';
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
import {
  DeleteChunkModal,
  DeleteCommentOfChunkModal,
  DeleteRelativeChunkModal,
  MakeRelativeChunkModal,
  UpdateChunkModal,
} from './ChunkModal';
import {
  bookmarkActionType,
  chunkInfo,
  deleteChunkActionType,
  deleteCommentActionType,
  deleteRelativeChunkActionType,
  likeActionType,
  relativeChunkInfo,
} from '../../modules/section';
import { Avatar, Box, CircularProgress } from '@material-ui/core';
import { insertCommentOfChunkRequest } from '../../apis/comment/types';

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
  linkBox: {},
  linkBox__link: {
    width: '100%',
    paddingTop: '56.25%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
  },
  commentBox: {
    width: '100%',
    position: 'relative',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    wordBreak: 'break-word',
  },
  c_commentBox: {
    width: '100%',
    position: 'relative',
    marginTop: '0.3rem',
    paddingLeft: '2rem',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    wordBreak: 'break-word',
  },
  commentIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    cursor: 'pointer',
  },
  commentAvatar: {
    marginRight: '1rem',
    display: 'inline-block',
  },
  commentInput: {
    width: '100%',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid black',
    marginTop: '30px',
    padding: '5px 0',
  },
}));

type chunkFormProps = {
  section_no: number;
  chunk_info: chunkInfo;
  section_tag_list: string[];
  deleteChunkRedux: (deleteChunkActionType: deleteChunkActionType) => void;
  updateChunkRedux: (chunkInfo: chunkInfo) => void;
  setBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  deleteBookmarkRedux: (bookmarkActionType: bookmarkActionType) => void;
  setLikeRedux: (likeActionType: likeActionType) => void;
  deleteLikeRedux: (likeActionType: likeActionType) => void;
  makeRelativeChunkRedux: (relativeChunkInfo: relativeChunkInfo) => void;
  deleteRelativeChunkRedux: (
    deleteRelativeChunkActionType: deleteRelativeChunkActionType,
  ) => void;
  setCommentRedux: (commentInfo: insertCommentOfChunkRequest) => void;
  deleteCommentRedux: (
    deleteCommentActionType: deleteCommentActionType,
  ) => void;
};

function ChunkForm({
  section_no,
  chunk_info,
  section_tag_list,
  deleteChunkRedux,
  updateChunkRedux,
  setBookmarkRedux,
  deleteBookmarkRedux,
  setLikeRedux,
  deleteLikeRedux,
  makeRelativeChunkRedux,
  deleteRelativeChunkRedux,
  setCommentRedux,
  deleteCommentRedux,
}: chunkFormProps) {
  const {
    no,
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
    relative_chunk_list,
    comment_list,
    comment_loading,
  } = chunk_info;

  const classes = cardStyles();
  const [expanded, setExpanded] = useState(false);

  const [comment, setComment] = useState<string>('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const setCommentEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const setMainCommentEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const commentInfo: insertCommentOfChunkRequest = {
        chunk_no: no,
        section_no: section_no,
        group_num: 0,
        content: comment,
        layer: 0,
      };

      setCommentRedux(commentInfo);

      setComment('');
    }
  };

  const setSubCommentEvent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    group_num: number,
  ) => {
    if (e.key === 'Enter') {
      const commentInfo: insertCommentOfChunkRequest = {
        chunk_no: no,
        section_no: section_no,
        group_num: group_num,
        content: comment,
        layer: 1,
      };

      setCommentRedux(commentInfo);

      setComment('');
    }
  };

  const windowOpen = (url: string) => {
    if (!url.match(/^https?:\/\//i)) {
      url = 'https://' + url;
    }
    return window.open(url);
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
                {/* REF 청크 업데이트 버튼 */}
                <UpdateChunkModal
                  chunk_no={no}
                  _url={link}
                  _title={title}
                  _description={description}
                  relative_chunk_list={relative_chunk_list}
                  chunk_tag_list={tag_list}
                  section_tag_list={section_tag_list}
                  updateChunkRedux={updateChunkRedux}
                  section_no={section_no}
                  bookmark_no={bookmark_no}
                  like_no={like_no}
                  regdate={regdate}
                />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {/* REF 청크 삭제 버튼 */}
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
        onClick={() => windowOpen(link)}
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
          {/* REF 관련 링크 추가 버튼 */}
          <MakeRelativeChunkModal
            chunk_no={no}
            section_no={section_no}
            makeRelativeChunkRedux={makeRelativeChunkRedux}
          />
          {description === '' || (
            <>
              <Typography paragraph> - 설명 - </Typography>
              <Typography>{description}</Typography>
              <hr />
            </>
          )}
          {/* REF 관련 링크 형태 */}
          {relative_chunk_list[0] !== undefined && (
            <Typography paragraph> - 관련 링크 - </Typography>
          )}
          {relative_chunk_list.map(relative_chunk => (
            <Box key={relative_chunk.no} className={classes.linkBox}>
              <div
                className={classes.linkBox__link}
                onClick={() => windowOpen(relative_chunk.link)}
                style={{
                  backgroundImage: `url(
                  ${relative_chunk.thumbnail}
                )`,
                }}
              />
              <Typography variant="h6" color="textSecondary" component="div">
                제목: {relative_chunk.title}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="div">
                설명: {relative_chunk.description}
              </Typography>
              {/* REF 관련 청크 삭제 버튼 */}
              <DeleteRelativeChunkModal
                chunk_no={relative_chunk.no}
                section_no={section_no}
                group_num={no}
                deleteRelativeChunkRedux={deleteRelativeChunkRedux}
              />
              <hr />
            </Box>
          ))}
          {/* REF 댓글 대댓글 형태 */}
          {comment_list[0] !== undefined && (
            <Typography paragraph> - 댓글 대댓글 형태 - </Typography>
          )}
          {comment_list.map(comment =>
            comment.layer === 0 ? (
              // REF 댓글
              <div key={comment.no}>
                <Box className={classes.commentBox}>
                  <Avatar
                    src={comment.profile}
                    className={classes.commentAvatar}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="span"
                  >
                    {comment.content} - {comment.name}
                  </Typography>
                  {/* 댓글 삭제 */}
                  <DeleteCommentOfChunkModal
                    section_no={section_no}
                    chunk_no={no}
                    comment_no={comment.no}
                    deleteCommentRedux={deleteCommentRedux}
                    layer={0}
                  />
                </Box>
                <input
                  type="text"
                  name="comment"
                  onKeyPress={e => setSubCommentEvent(e, comment.group_num)}
                  onChange={setCommentEvent}
                  className={classes.commentInput}
                  placeholder="대댓글을 입력해주세요."
                />
              </div>
            ) : (
              // REF 대댓글
              <div key={comment.no}>
                <Box className={classes.c_commentBox}>
                  <Avatar
                    src={comment.profile}
                    className={classes.commentAvatar}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="span"
                  >
                    {comment.content} - {comment.name}
                  </Typography>
                  {/* 대댓글 삭제 */}
                  <DeleteCommentOfChunkModal
                    section_no={section_no}
                    chunk_no={no}
                    comment_no={comment.no}
                    layer={1}
                    deleteCommentRedux={deleteCommentRedux}
                  />
                </Box>
              </div>
            ),
          )}
          {/* REF 댓글 입력 창 */}
          {comment_loading ? (
            <CircularProgress />
          ) : (
            <input
              type="text"
              name="comment"
              id="comment"
              onChange={setCommentEvent}
              onKeyPress={setMainCommentEvent}
              className={classes.commentInput}
              placeholder="댓글을 입력해주세요."
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ChunkForm;
