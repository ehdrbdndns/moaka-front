import React from 'react';
import CardList from '../../components/CardList/CardList';
import Navigation from '../../components/Navigation/Navigation';

function MyPage() {
  return (
    <>
      <div className="container">
        <div className="container__main">
          <CardList title="내 아카이브" />
          <CardList title="북마크한 아카이브" isShow={false} />
        </div>
        <div className="container__sub">
          <Navigation mode="mypage"></Navigation>
        </div>
      </div>
    </>
  );
}

export default MyPage;
