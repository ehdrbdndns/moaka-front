import React from 'react';
import CardList from '../CardList/CardList';
import Navigation from '../Navigation/Navigation';
import { HomeProps } from './type';

function Home(data: HomeProps) {
  const { dispatch, archiveInfo, authInfo } = data;
  return (
    <div className="container">
      <div className="container__main">
        <CardList
          dispatch={dispatch}
          archiveInfoList={archiveInfo}
          archiveType="top"
          title="가장 인기있는 아카이브"
        />
        <CardList
          dispatch={dispatch}
          archiveInfoList={archiveInfo}
          archiveType="category"
          title="내가 관심있는 아카이브"
        />
      </div>
      <div className="container__sub">
        <Navigation
          dispatch={dispatch}
          authInfo={authInfo}
          mode="home"
        ></Navigation>
      </div>
    </div>
  );
}

export default Home;
