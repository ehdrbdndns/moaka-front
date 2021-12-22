import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeForm from '../../components/Home/Home';
import { RootState } from '../../modules';
import {
  getCategoryArchiveList,
  getTopArchiveList,
  resetArchive,
} from '../../modules/archive';

function Home() {
  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);

  useEffect(() => {
    // 아카이브 초기화
    dispatch(resetArchive());

    // 가장 인기있는 아카이브 리스트 불러오기
    dispatch(getTopArchiveList());

    // 내가 관심있는 아카이브 리스트 불러오기
    dispatch(getCategoryArchiveList());
  }, [dispatch]);

  return <HomeForm dispatch={dispatch} archive_info={archive_info}></HomeForm>;
}

export default Home;
