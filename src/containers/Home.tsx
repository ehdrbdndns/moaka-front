import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerForm from '../components/Banner/BannerForm';
import HomeForm from '../components/Home/HomeForm';
import { RootState } from '../modules';
import { getHomeArchiveList } from '../modules/archive';

function Home() {
  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);

  const getHomeArchievListRedux = useCallback(() => {
    dispatch(getHomeArchiveList());
  }, [dispatch]);

  return (
    <>
      <BannerForm />
      <HomeForm
        loading={archive_info.loading}
        error={archive_info.error}
        archive_info_data={archive_info.data}
        getHomeArchievListRedux={getHomeArchievListRedux}
      />
    </>
  );
}

export default Home;
