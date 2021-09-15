import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertArchiveRequest } from '../apis/archives/types';
import HeaderForm from '../components/Header/HeaderForm';
import { RootState } from '../modules';
import { insertArchive } from '../modules/archive';
import { searchUserList } from '../modules/userList';

function Header() {
  const dispatch = useDispatch();
  const userListInfo = useSelector((state: RootState) => state.userList);

  const searchUserListRedux = (id: string) => {
    dispatch(searchUserList(id));
  };

  const insertArchiveRedux = (insertArchiveRequest: insertArchiveRequest) => {
    dispatch(insertArchive(insertArchiveRequest));
  };

  return (
    <HeaderForm
      userListInfo={userListInfo}
      searchUserListRedux={searchUserListRedux}
      insertArchiveRedux={insertArchiveRedux}
    />
  );
}

export default Header;
