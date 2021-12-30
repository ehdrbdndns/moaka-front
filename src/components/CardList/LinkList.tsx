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
                user_no={link.user_no}
                authInfo={props.authInfo}
                dispatch={props.dispatch}
                type={props.linktype}
                no={link.no}
                id={link.id}
                url={link.url}
                title={link.title}
                thumbnail_src={link.thumbnail_src}
                description={link.description}
                favicon_src={link.favicon_src}
                chat_count={link.chat_count}
                like_value={link.like_value}
                like_isActive={link.like_isActive}
                like_no={link.like_no}
                is_info_show={true}
                onClick={link.onClick}
                section_no={link.section_no}
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
