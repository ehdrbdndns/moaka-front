import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertArchiveRequest } from '../apis/archives/types';
import { MakeArchiveModal } from '../components/ArchiveModal/ArchiveModal';
import { RootState } from '../modules';
import { insertArchive } from '../modules/archive';
import { searchUserList } from '../modules/userList';

function TEST() {
  const dispatch = useDispatch();
  const userListInfo = useSelector((state: RootState) => state.userList);

  const searchUserListRedux = (id: string) => {
    dispatch(searchUserList(id));
  };

  const insertArchiveRedux = (insertArchiveRequest: insertArchiveRequest) => {
    dispatch(insertArchive(insertArchiveRequest));
  };

  return (
    <>
      <MakeArchiveModal
        search_user_loading={userListInfo.loading}
        search_user_list={userListInfo.data}
        search_user_error={userListInfo.error}
        searchUserListRedux={searchUserListRedux}
        insertArchiveRedux={insertArchiveRedux}
      />
    </>
  );
}

export default TEST;
