/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import './styles/main.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import MyPage from './containers/MyPage';
import ArchiveDetail from './containers/ArchiveDetail';
import TEST from './containers/TEST';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Search from './containers/Search';
import NewArchiveCardList from './components/CardList/NewArchiveCardList';
import NewHomeCardList from './components/CardList/NewHomeCardList';
import NewMyCardList from './components/CardList/NewMyCardList';
import Component from './components/Component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/component" component={Component} />
        <Route path="/mypage" component={NewMyCardList} />
        <Route path="/" component={Home} />
      </Switch>
      {/* <NewSide /> */}
      {/* <Header /> */}
      {/* <Switch>
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
        <Route path="/archive/detail">
          <ArchiveDetail />
        </Route>
        <Route path="/archive/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer /> */}
    </div>
  );
}

export default App;
