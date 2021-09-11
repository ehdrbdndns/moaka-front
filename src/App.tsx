import React from 'react';
import './App.css';
import './styles/main.scss';
import archives from './archives.json';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import MyPage from './containers/MyPage';
import Header from './components/Header/Header';
import Archive_search from './containers/Archive_search';
import ArchiveDetail from './containers/ArchiveDetail';
import ArchiveList from './components/ArchiveList/ArchiveList';
import TEST from './containers/TEST';

function App() {
  return (
    <div>
      <Header title="모아카" loginStatus={false} />
      <Switch>
        <Route path="/test">
          <TEST />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <Route path="/archive/search">
          <Archive_search />
        </Route>
        <Route path="/archive/detail">
          <ArchiveDetail />
        </Route>
        <Route path="/archive">
          <ArchiveList archiveList={archives} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
