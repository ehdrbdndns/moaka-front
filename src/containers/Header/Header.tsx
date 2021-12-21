import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import HeaderForm from '../../components/Header/Header';
import { setUser } from '../../modules/auth';

function Header() {
  const dispatch = useDispatch();
  const userListInfo = useSelector((state: RootState) => state.userList);
  const authInfo = useSelector((state: RootState) => state.auth);

  // 로그인 여부 확인
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  return (
    <>
      <HeaderForm
        dispatch={dispatch}
        userListInfo={userListInfo}
        authInfo={authInfo}
      ></HeaderForm>
    </>
  );
}

export default Header;
