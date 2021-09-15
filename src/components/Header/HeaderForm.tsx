import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { headerStyles } from './styles';
import { useHistory } from 'react-router';
import { MakeArchiveModal } from '../Archive/ArchiveModal';
import { insertArchiveRequest } from '../../apis/archives/types';
import { initialState as userListInfo } from '../../modules/userList';

type MakeArchiveModalProps = {
  userListInfo: userListInfo;
  searchUserListRedux: (id: string) => void;
  insertArchiveRedux: (insertArchiveRequest: insertArchiveRequest) => void;
};

function HeaderForm({
  userListInfo,
  searchUserListRedux,
  insertArchiveRedux,
}: MakeArchiveModalProps) {
  const classes = headerStyles();
  const { push } = useHistory();

  const moveHomeEvent = () => {
    push('/');
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          onClick={moveHomeEvent}
          className={classes.toolbarTitle}
        >
          모아카
        </Typography>
        <div>
          <Link to="/register" className={classes.signButton}>
            <Button variant="outlined" size="small">
              Sign-up
            </Button>
          </Link>
          <Link to="/login" className={classes.signButton}>
            <Button variant="outlined" size="small">
              Sign-in
            </Button>
          </Link>
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {/* 검색 필드 추가 */}
        <Paper component="form" className={classes.searchRoot}>
          <InputBase
            className={classes.searchInput}
            placeholder="아카이브를 검색해 보세요."
            inputProps={{ 'aria-label': 'search archives' }}
          />
          <Link
            to={{
              pathname: '/archive/search',
              state: {},
            }}
          >
            <IconButton
              type="submit"
              className={classes.searchButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Link>
        </Paper>
        {/* 아카이브 생성 */}
        <MakeArchiveModal
          search_user_loading={userListInfo.loading}
          search_user_list={userListInfo.data}
          searchUserListRedux={searchUserListRedux}
          insertArchiveRedux={insertArchiveRedux}
        />
      </Toolbar>
      <Divider />
    </React.Fragment>
  );
}
export default HeaderForm;
