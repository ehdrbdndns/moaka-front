import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router';
import { MakeArchiveModal } from '../Archive/ArchiveModal';
import { insertArchiveRequest } from '../../apis/archives/types';
import { initialState as userListInfo } from '../../modules/userList';
import { initialState as authInfo } from '../../modules/auth';
import { CircularProgress, makeStyles } from '@material-ui/core';
import MypageModal from '../MyPage/MyPageModal';
import { updateUserRequest } from '../../apis/auth/types';

const headerStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'spaceAround',
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '60px',
  },
  avatar: {
    cursor: 'Pointer',
  },
  toolbarTitle: {
    flex: 1,
    position: 'relative',
    cursor: 'pointer',
  },
  toolbarSecondary: {
    height: '60px',
    justifyContent: 'center',
    // overflowX: '50px',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    fontSize: '20px',
    color: 'inherit',
    textDecoration: 'none',
  },
  signButton: {
    fontSize: '20px',
    color: 'inherit',
    textDecoration: 'none',
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 30,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '15px',
  },
  searchButton: {
    padding: 10,
  },
}));

type MakeArchiveModalProps = {
  userListInfo: userListInfo;
  authInfo: authInfo;
  searchUserListRedux: (id: string) => void;
  insertArchiveRedux: (insertArchiveRequest: insertArchiveRequest) => void;
  updateUserRedux: (userInfo: updateUserRequest) => void;
  logoutRedux: () => void;
};

function HeaderForm({
  authInfo,
  userListInfo,
  searchUserListRedux,
  insertArchiveRedux,
  updateUserRedux,
  logoutRedux,
}: MakeArchiveModalProps) {
  const classes = headerStyles();
  const { push } = useHistory();

  const [search, setSearch] = useState('');

  const setSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyPressOfSearchBarEvent = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      push({
        pathname: '/archive/search',
        search: '?p=' + search,
        state: { search: search },
      });
    }
  };

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
          {authInfo.loading ? (
            <CircularProgress />
          ) : authInfo.data.no !== 0 ? (
            <MypageModal
              logoutRedux={logoutRedux}
              authInfo={authInfo.data}
              updateUserRedux={updateUserRedux}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {/* 검색 필드 추가 */}
        <Paper className={classes.searchRoot}>
          <InputBase
            className={classes.searchInput}
            placeholder="아카이브를 검색해 보세요."
            value={search}
            onChange={setSearchEvent}
            onKeyPress={onKeyPressOfSearchBarEvent}
            inputProps={{ 'aria-label': 'search archives' }}
          />
          <IconButton
            id="search_icon"
            className={classes.searchButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
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
