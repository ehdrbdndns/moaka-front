import React from 'react';
import ArchiveList from '../components/ArchiveList/ArchiveList';
import { useLocation } from 'react-router';

type archiveInfo = {
  no: number;
  title: string;
  description: string;
  tag_list: Array<string>;
  user_no: number;
};

function Archive_search() {
  const location = useLocation();
  const data = location.state as { searchResult: Array<archiveInfo> };

  return (
    <div>
      {data.searchResult ? (
        <ArchiveList archiveList={data.searchResult} />
      ) : (
        <div>none</div>
      )}
    </div>
  );
}

export default Archive_search;
