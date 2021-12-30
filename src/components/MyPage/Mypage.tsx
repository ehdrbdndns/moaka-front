import React from 'react';
import CardList from '../CardList/CardList';
import Navigation from '../Navigation/Navigation';
import { MypageProps } from './type';

function Mypage(data: MypageProps) {
  const { dispatch, archiveInfo, authInfo } = data;
  return (
    <>
      <div className="container">
        <div className="container__main">
          <CardList
            authInfo={authInfo.data}
            dispatch={dispatch}
            archiveType="group"
            archiveInfoList={archiveInfo}
            title="내 아카이브"
          />
          <CardList
            authInfo={authInfo.data}
            dispatch={dispatch}
            archiveType="bookmark"
            archiveInfoList={archiveInfo}
            title="북마크한 아카이브"
          />
        </div>
        <div className="container__sub">
          <Navigation
            dispatch={dispatch}
            authInfo={authInfo}
            mode="mypage"
          ></Navigation>
        </div>
      </div>
    </>
  );
}

export default Mypage;
