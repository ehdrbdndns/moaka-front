import React from 'react';
import NewArchiveCard from '../Card/NewArchiveCard';
import { NewArchiveCardListProps } from './type';

function NewArchiveCardList(props: NewArchiveCardListProps) {
  const cardOnoff = (e: any) => {
    const index = e.target.dataset.index;
    document
      .querySelector('#card-list-index-' + index)
      ?.classList.toggle('show');
  };

  return (
    <>
      <div
        className="card-list show card-index-1"
        id={'card-list-index-' + props.index}
      >
        <div className="card-list__header">
          <h1 className="card-list__title">{props.title}</h1>
          <img
            className="card-list__toggle image-s"
            data-index={props.index}
            src="/img/svg/up-arrow.svg"
            alt="열림 닫힘 아이콘"
            onClick={cardOnoff}
          />
        </div>
        <div className="card-list__content">
          <NewArchiveCard />
          <NewArchiveCard />
          <NewArchiveCard />
          <NewArchiveCard />
          <NewArchiveCard />
          <NewArchiveCard />
          <NewArchiveCard />
        </div>
      </div>
    </>
  );
}

export default NewArchiveCardList;
