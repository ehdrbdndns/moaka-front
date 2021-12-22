import React, { useRef } from 'react';
import { toggleCardList } from './event';
import { CardListProps } from './type';
import Card from '../Card/Card';

function CardList(props: CardListProps) {
  const cardElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={'card-list ' + (props.isShow && 'show')} ref={cardElem}>
        <div className="card-list__header">
          <h1 className="card-list__title">{props.title}</h1>
          <img
            className="card-list__toggle image-s"
            src="/img/svg/up-arrow.svg"
            alt="열림 닫힘 아이콘"
            onClick={() => toggleCardList(cardElem)}
          />
        </div>
        <div className="card-list__content">
          {/* Card */}
          {props.archiveInfoList.data.map(
            archive =>
              archive.type === props.archiveType && (
                <div key={archive.no}>
                  <Card dispatch={props.dispatch} archiveInfo={archive}></Card>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
}

CardList.defaultProps = {
  title: '아카이브',
  isShow: true,
};

export default CardList;
