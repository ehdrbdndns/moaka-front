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

function App() {
  return (
    <div>
      <Header />
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
        <Route path="/archive/detail">
          <ArchiveDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer
        title="모두가 함께하는 아카이브 모아카"
        description="서로 다른 mbti들의 모임"
      />
    </div>
  );
}

export default App;
