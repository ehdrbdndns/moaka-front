import React from 'react';
import Favicon from '../Favicon/Favicon';
import HeartIcon from '../Icon/HeartIcon';
import Thumbnail from '../Thumbnail/Thumbnail';
import { LinkProps } from './type';

function Link(data: LinkProps) {
  return (
    <>
      <article
        className={'link ' + data.type}
        id={data.id}
        onClick={() => {
          // onClickLink()
        }}
      >
        <div className="link__header">
          {data.favicon_src === '' ? (
            <Favicon type="link" src="/img/link-favicon.png" />
          ) : (
            <Favicon type="link" src={data.favicon_src} />
          )}
          <span className="link__title">{data.title}</span>
        </div>
        {data.type === 'imageview' &&
          (data.thumbnail_src === '' ? (
            <Thumbnail src="/img/default-link-img.png" type="link_thumbnail" />
          ) : (
            <Thumbnail src={data.thumbnail_src} type="link_thumbnail" />
          ))}
        {data.is_info_show && (
          <div className="link__info">
            <HeartIcon value={0} isActive={data.like_isActive} />
            <span>{data.comment_count}개의 답글</span>
          </div>
        )}
        <div className="link__description">{data.description}</div>
      </article>
    </>
  );
}

Link.defaultProps = {
  type: 'listview', // listview, imageview
  url: 'naver.com',
  thumbnail_src: '/img/default-link-img.png',
  favicon_src: '/img/link-favicon.png',
  title: '링크 제목',
  description: '링크에 대한 설명',

  // 답글 개수
  comment_count: 0,

  // 좋아요 개수
  like_value: '0',
  // 좋아요 여부
  like_isActive: false,

  // link info 노출 여부
  is_info_show: true,
};

export default Link;
