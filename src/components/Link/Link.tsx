import { nanoid } from 'nanoid';
import React from 'react';
import Favicon from '../Favicon/Favicon';
import HeartIcon from '../Icon/HeartIcon';
import Thumbnail from '../Thumbnail/Thumbnail';
import { onClickLink } from './event';
import { LinkProps } from './type';

function Link(data: LinkProps) {
  return (
    <>
      <div className={'link ' + data.type} id={data.id} onClick={onClickLink}>
        <div className="link__header">
          <Favicon type="link" src={data.favicon_src} />
          <span className="link__title">{data.title}</span>
        </div>
        {data.type === 'imageview' && (
          <Thumbnail src={data.thumbnail_src} type="link_thumbnail" />
        )}
        <div className="link__info">
          <HeartIcon
            id={nanoid()}
            value={data.like_value}
            isActive={data.like_isActive}
          />
          <span>{data.comment_count}개의 답글</span>
        </div>
        <div className="link__description">{data.description}</div>
      </div>
    </>
  );
}

Link.defaultProps = {
  type: 'listview', // listview, imageview
  url: 'naver.com',
  thumbnail_src: '/img/test/thumbnail.png',
  favicon_src: '/img/link-favicon.png',
  title: '링크 제목',
  description: '링크에 대한 설명',

  // 답글 개수
  comment_count: 0,

  // 좋아요 개수
  like_value: '0',
  // 좋아요 여부
  like_isActive: false,
};

export default Link;
