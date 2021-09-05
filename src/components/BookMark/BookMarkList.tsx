import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardForm from '../Chunk/ChunkForm';
import archiveBookmarks from '../../archives.json';
import ContentCardForm from '../ContentCardForm/ContentCardForm';
import ArchiveList from '../ArchiveList/ArchiveList';
import contentBookmarks from '../../contents.json';
import ImageList from '@material-ui/core/ImageList';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: '-webkit-fill-available',
        height: 'fit-content',
      },
    },
    paperLayout: {},
    contentList: {
      display: 'flex',
      height: 'fit-content',
    },
    paperTitle: {
      marginLeft: '20px',
      height: '15px',
      fontWeight: 400,
    },
    archiveList: {
      display: 'flex',
    },
    bookmarkButton: {
      backgroundColor: 'white',
      border: 'none',
      position: 'relative',
      top: '-355px',
      left: '293px',
    },
  }),
);

export default function BookMarkList() {
  const classes = useStyles();
  const [contents, setContents] = React.useState(contentBookmarks);
  const [archives, setArchives] = React.useState(archiveBookmarks);
  const handleContentButton = (no: number) => {
    if (window.confirm('북마크를 취소하시겠습니까?')) {
      setContents(contents.filter(content => content.no !== no));
      alert('북마크가 취소되었습니다.');
    }
  };
  const handleArchiveButton = (no: number) => {
    if (window.confirm('북마크를 취소하시겠습니까?')) {
      setArchives(archives.filter(archive => archive.no !== no));
      alert('북마크가 취소되었습니다.');
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paperLayout}>
        <h3 className={classes.paperTitle}>contents</h3>
        <Divider />
        <div className={classes.contentList}>
          {contents.map(content => (
            <div>
              <ContentCardForm
                title={content.title}
                description={content.description}
              />
              <button
                className={classes.bookmarkButton}
                onClick={() => handleContentButton(content.no)}
              >
                <FavoriteIcon />
              </button>
            </div>
          ))}
        </div>
      </Paper>
      <Paper>
        <h3 className={classes.paperTitle}>archives</h3>
        <Divider />
        <div className={classes.archiveList}>
          <div className={classes.contentList}>
            {archives.map(archive => (
              <div>
                <ContentCardForm
                  title={archive.title}
                  description={archive.description}
                />
                <button
                  className={classes.bookmarkButton}
                  onClick={() => handleArchiveButton(archive.no)}
                >
                  <FavoriteIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
}
