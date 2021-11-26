import React from 'react';
import NewArchiveCardList from './NewArchiveCardList';

function NewHomeCardList() {
  return (
    <>
      <div className="w-100">
        <NewArchiveCardList title="가장 인기있는 아카이브" index={1} />
        <NewArchiveCardList title="내가 관심있는 아카이브" index={2} />
      </div>
    </>
  );
}

export default NewHomeCardList;
