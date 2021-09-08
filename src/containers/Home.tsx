import { LoopTwoTone } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerForm from '../components/Banner/BannerForm';
import Footer from '../components/Footer/Footer';
import HomeForm from '../components/Home/HomeForm';
import { RootState } from '../modules';
import { getGroupArchiveList } from '../modules/archive';

function Home() {
  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);

  const getGroupArchiveListRedux = useCallback(() => {
    dispatch(getGroupArchiveList());
  }, [dispatch]);

  return (
    <>
      <BannerForm />
      <HomeForm
        loading={archive_info.loading}
        error={archive_info.error}
        archive_info_data={archive_info.data}
        getGroupArchiveListRedux={getGroupArchiveListRedux}
      />
      <Footer
        title="모두가 함께하는 아카이브 모아카"
        description="서로 다른 mbti들의 모임"
      />
    </>
  );
}

export default Home;
