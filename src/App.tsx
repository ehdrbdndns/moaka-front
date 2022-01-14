import React from 'react';
import TagManager from 'react-gtm-module';
import './App.css';
import './styles/main.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import MyPage from './containers/MyPage/MyPage';
import ArchiveDetail from './containers/Archive/ArchiveDetail';
import Header from './containers/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const tagManagerArgs = {
    gtmId: 'GTM-KFL43BS',
  };

  TagManager.initialize(tagManagerArgs);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/archive" component={ArchiveDetail} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
