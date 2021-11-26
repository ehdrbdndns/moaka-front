/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import './styles/main.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import MyPage from './containers/MyPage';
import ArchiveDetail from './containers/ArchiveDetail';
import TEST from './containers/TEST';
import Footer from './components/Footer/Footer';
import Header from './containers/Header';
import Search from './containers/Search';
import NewHeaderForm from './components/Header/NewHeaderForm';
import NewArchiveCardList from './components/CardList/NewArchiveCardList';
import NewSide from './components/Side/NewSide';

function App() {
  return (
    <div>
      <NewHeaderForm />
      <div className="container">
        <div className="row">
          <div className="w-100">
            <NewArchiveCardList title="가장 인기있는 아카이브" index={1} />
            <NewArchiveCardList title="내가 관심있는 아카이브" index={2} />
          </div>
          <NewSide />
        </div>
      </div>
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
