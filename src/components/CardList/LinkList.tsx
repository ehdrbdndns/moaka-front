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
          {props.linkList.map(link => (
            <div key={nanoid()}>
              <Link
                type={props.linktype}
                id={link.id}
                url={link.url}
                thumbnail_src={link.thumbnail_src}
                description={link.description}
                favicon_src={link.favicon_src}
                comment_count={link.comment_count}
                like_value={link.like_value}
                like_isActive={link.like_isActive}
                is_info_show={true}
              ></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

LinkList.defaultProps = {
  title: '링크',
  isShow: true,
  linktype: 'imageview',
  linkList: [],
};

export default LinkList;
