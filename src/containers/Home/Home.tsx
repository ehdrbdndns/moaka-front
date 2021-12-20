import React from 'react';
import CardList from '../../components/CardList/CardList';
import Navigation from '../../components/Navigation/Navigation';

function Home() {
  return (
    <div className="container">
      <div className="container__main">
        <CardList title="가장 인기있는 아카이브" />
        <CardList title="내가 관심있는 아카이브" isShow={false} />
      </div>
      <div className="container__sub">
        <Navigation mode="home"></Navigation>
      </div>
    </div>
  );
}

export default Home;
