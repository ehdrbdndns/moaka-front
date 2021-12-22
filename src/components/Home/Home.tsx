import React from 'react';
import CardList from '../CardList/CardList';
import Navigation from '../Navigation/Navigation';
import { HomeProps } from './type';

function Home(data: HomeProps) {
  const { dispatch, archive_info } = data;
  return (
    <div className="container">
      <div className="container__main">
        <CardList
          dispatch={dispatch}
          archiveInfoList={archive_info}
          archiveType="top"
          title="가장 인기있는 아카이브"
        />
        <CardList
          dispatch={dispatch}
          archiveInfoList={archive_info}
          archiveType="category"
          title="내가 관심있는 아카이브"
        />
      </div>
      <div className="container__sub">
        <Navigation mode="home"></Navigation>
      </div>
    </div>
  );
}

export default Home;
