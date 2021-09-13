import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { headerStyles } from './styles';
import { HeaderProps, ArchiveInfo } from './types';
import archives from '../../archives.json';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

function Header(props: HeaderProps) {
  const history = useHistory();
  const classes = headerStyles();
  const { title, loginStatus } = props;
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(
    archives.filter(archive => archive.title.includes(searchInput)),
  );
  const [isSearch, setIsSearch] = useState(false);
  //if 문 걸고~ useState 검색 버튼 했는지 안했는지
  useEffect(() => {
    if (isSearch) {
      history.push({
        pathname: '/archive/search',
        state: { searchResult: searchResult },
      });
    }
  }, [history, isSearch, searchResult]);
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSearchButton = () => {
    setSearchResult(
      archives.filter(
        archive =>
          archive.title.includes(searchInput) ||
          archive.description.includes(searchInput) ||
          archive.tag_list.includes(searchInput),
      ),
    );
    changeIsSearchState();
  };
  const setIsSearchEvent = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      changeIsSearchState();
    }
  };
  const changeIsSearchState = () => {
    setIsSearch(!isSearch);
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
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>

        {/* 검색 필드 추가 */}

        <div>
          <Paper component="form" className={classes.searchRoot}>
            <InputBase
              className={classes.searchInput}
              placeholder="아카이브를 검색해 보세요."
              inputProps={{ 'aria-label': 'search archives' }}
              onChange={handleSearchInput}
            />
            <Link
              to={{
                pathname: '/archive/search',
                state: { searchResult: searchResult },
              }}
            >
              <IconButton
                type="submit"
                className={classes.searchButton}
                aria-label="search"
                onClick={handleSearchButton}
                onKeyPress={setIsSearchEvent}
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </Paper>
        </div>
        {loginStatus ? (
          <Link to="/mypage">
            <Avatar src="/broken-image.jpg" />
          </Link>
        ) : (
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
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link to={'/'} className={classes.toolbarLink}>
          Home
        </Link>
        <Link to={'/mypage'} className={classes.toolbarLink}>
          Mypage
        </Link>
        <Link to={'/test'} className={classes.toolbarLink}>
          test
        </Link>
      </Toolbar>
      <Divider />
    </React.Fragment>
  );
}
export default Header;
