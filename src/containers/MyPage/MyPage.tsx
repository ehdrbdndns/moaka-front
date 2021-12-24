import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import MypageForm from '../../components/MyPage/Mypage';
import {
  getBookmarkArchiveList,
  getGroupArchiveList,
  resetArchive,
} from '../../modules/archive';

function MyPage() {
  const dispatch = useDispatch();
  const archiveInfo = useSelector((state: RootState) => state.archive);
  const authInfo = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // 아카이브 초기화
    dispatch(resetArchive());

    // 내 소속 아카이브 불러오기
    dispatch(getGroupArchiveList());

    // 내가 북마크한 아카이브 불러오기
    dispatch(getBookmarkArchiveList());
  }, [dispatch]);

  return (
    <>
      <MypageForm
        dispatch={dispatch}
        archiveInfo={archiveInfo}
        authInfo={authInfo}
      ></MypageForm>
    </>
  );
}

export default MyPage;
