import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../../components/CardList/CardList';
import Navigation from '../../components/Navigation/Navigation';
import { RootState } from '../../modules';

function MyPage() {
  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);

  return (
    <>
      <div className="container">
        <div className="container__main">
          <CardList
            dispatch={dispatch}
            archiveType="my"
            archiveInfoList={archive_info}
            title="내 아카이브"
          />
          <CardList
            dispatch={dispatch}
            archiveType="bookmark"
            archiveInfoList={archive_info}
            title="북마크한 아카이브"
            isShow={false}
          />
        </div>
        <div className="container__sub">
          <Navigation mode="mypage"></Navigation>
        </div>
      </div>
    </>
  );
}

export default MyPage;
