import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../../components/CardList/CardList';
import Navigation from '../../components/Navigation/Navigation';
import { RootState } from '../../modules';
import { getTopArchiveList, resetArchive } from '../../modules/archive';

function Home() {
  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);

  useEffect(() => {
    // 아카이브 초기화
    dispatch(resetArchive());

    // 가장 인기있는 아카이브 리스트
    dispatch(getTopArchiveList());

    // 내가 관심있는 아카이브 리스트
  }, [dispatch]);

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
          isShow={false}
        />
      </div>
      <div className="container__sub">
        <Navigation mode="home"></Navigation>
      </div>
    </div>
  );
}

export default Home;
