import React from 'react';
import logo from './logo.svg';
import './App.css';
import archives from './archives.json';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import MyPage from './containers/MyPage';
import Section from './containers/Section';
import Header from './components/Header/Header';
import Archive_search from './containers/Archive_search';
import Archive_detail from './containers/Archive_detail';
import ArchiveList from './components/ArchiveList/ArchiveList';

function App() {
  return (
    <div>
      <Header title="모아카" loginStatus={false} />
      <Switch>
        <Route path="/test">
          <Section />
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
          <Archive_detail />
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
