import React, { useCallback } from 'react';
import { deleteLike, setLike } from '../../modules/section';
import Favicon from '../Favicon/Favicon';
import HeartIcon from '../Icon/HeartIcon';
import Thumbnail from '../Thumbnail/Thumbnail';
import { LinkProps } from './type';

function Link(data: LinkProps) {
  const { dispatch } = data;

  const setLikeRedux = useCallback(() => {
    dispatch &&
      dispatch(
        setLike({
          chunk_no: data.no,
          like_no: 0,
          section_no: data.section_no,
        }),
      );
  }, [data.no, data.section_no, dispatch]);

  const deleteLikeRedux = useCallback(() => {
    dispatch &&
      dispatch(
        deleteLike({
          chunk_no: data.no,
          like_no: data.like_no,
          section_no: data.section_no,
        }),
      );
  }, [data.like_no, data.no, data.section_no, dispatch]);

  return (
    <>
      <article className={'link ' + data.type} id={data.id}>
        <div
          className="link__header"
          onClick={() => {
            data.onClick();
          }}
        >
          {data.favicon_src === '' ? (
            <Favicon type="link" src="/img/link-favicon.png" />
          ) : (
            <Favicon type="link" src={data.favicon_src} />
          )}
          <span className="link__title">{data.title}</span>
        </div>
        <div
          onClick={() => {
            data.onClick();
          }}
        >
          {data.type === 'imageview' &&
            (data.thumbnail_src === '' ? (
              <Thumbnail src="/img/default-link-img.png" type="link" />
            ) : (
              <Thumbnail src={data.thumbnail_src} type="link" />
            ))}
        </div>
        {data.is_info_show && (
          <div className="link__info">
            <HeartIcon
              value={data.like_value}
              isActive={data.like_isActive}
              setLikeEvent={setLikeRedux}
              deleteLikeEvent={deleteLikeRedux}
            />
            <span>{data.chat_count}개의 답글</span>
          </div>
        )}
        <div className="link__description">{data.description}</div>
      </article>
    </>
  );
}

Link.defaultProps = {
  no: 0,
  dispatch: null,
  type: 'listview', // listview, imageview
  url: 'naver.com',
  thumbnail_src: '/img/default-link-img.png',
  favicon_src: '/img/link-favicon.png',
  title: '링크 제목',
  description: '링크에 대한 설명',

  // 답글 개수
  chat_count: 0,

  // 좋아요 개수
  like_value: 0,
  // 좋아요 여부
  like_isActive: false,
  // 좋아요 고유번호
  like_no: 0,

  // link info 노출 여부
  is_info_show: true,

  // 섹션 DB 고유번호
  section_no: 0,

  onClick: () => {},
};

export default Link;
