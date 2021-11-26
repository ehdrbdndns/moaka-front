import React from 'react';
import NewArchiveCardList from './NewArchiveCardList';

function NewMyCardList() {
  return (
    <>
      <div className="w-100">
        <NewArchiveCardList title="최근 본 아카이브" index={1} />
        <NewArchiveCardList title="좋아요 한 아카이브" index={2} />
        <NewArchiveCardList title="좋아요 한 링크" index={3} />
      </div>
    </>
  );
}

export default NewMyCardList;
