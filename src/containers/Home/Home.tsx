import React from 'react';
import NewArchiveCardList from '../../components/CardList/NewArchiveCardList';
import Navigation from '../../components/Navigation/Navigation';

function Home() {
  return (
    <div className="container">
      <div className="container__main">
        <NewArchiveCardList title="가장 인기있는 아카이브" index={1} />
      </div>
      <div className="container__sub">
        <Navigation mode="home"></Navigation>
      </div>
    </div>
  );
}

export default Home;
