import React, { useRef } from 'react';
import { toggleCardList } from './event';
import { LinkListProps } from './type';
import Link from '../Link/Link';
import { nanoid } from 'nanoid';

function LinkList(props: LinkListProps) {
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
          <div>
            <Link type={props.linktype} id={nanoid()}></Link>
          </div>
          <div>
            <Link type={props.linktype} id={nanoid()}></Link>
          </div>
          <div>
            <Link type={props.linktype} id={nanoid()}></Link>
          </div>
          <div>
            <Link type={props.linktype} id={nanoid()}></Link>
          </div>
        </div>
      </div>
    </>
  );
}

LinkList.defaultProps = {
  title: '링크',
  isShow: true,
  linktype: 'imageview',
};

export default LinkList;
