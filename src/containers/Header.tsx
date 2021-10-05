import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertArchiveRequest } from '../apis/archives/types';
import { updateUserRequest } from '../apis/auth/types';
import HeaderForm from '../components/Header/HeaderForm';
import { RootState } from '../modules';
import { insertArchive } from '../modules/archive';
import { getLogout, setUser, updateUser } from '../modules/auth';
import { searchUserList } from '../modules/userList';

function Header() {
  const dispatch = useDispatch();
  const userListInfo = useSelector((state: RootState) => state.userList);
  const authInfo = useSelector((state: RootState) => state.auth);

  const searchUserListRedux = (id: string) => {
    dispatch(searchUserList(id));
  };

  const insertArchiveRedux = (insertArchiveRequest: insertArchiveRequest) => {
    dispatch(insertArchive(insertArchiveRequest));
  };

  const logoutRedux = () => {
    dispatch(getLogout());
  };

  const updateUserRedux = (userInfo: updateUserRequest) => {
    dispatch(updateUser(userInfo));
  };

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  return (
    <HeaderForm
      authInfo={authInfo}
      userListInfo={userListInfo}
      searchUserListRedux={searchUserListRedux}
      insertArchiveRedux={insertArchiveRedux}
      updateUserRedux={updateUserRedux}
      logoutRedux={logoutRedux}
    />
  );
}

export default Header;
