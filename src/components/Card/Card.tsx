import { nanoid } from 'nanoid';
import React from 'react';
import HeartIcon from '../Icon/HeartIcon';
import Profile from '../Profile/Profile';
import Thumbnail from '../Thumbnail/Thumbnail';
import { CardProps } from './type';

function Card(data: CardProps) {
  return (
    <>
      <div className="card">
        <div className="card__header">
          <img
            src="/img/svg/bookmark.svg"
            className="card__bookmark"
            alt="북마크"
          />
          <h1 className="card__title">{data.title}</h1>
          <div className="card__info">
            <div className="card__icon-box">
              <Profile size="s" />
              <span className="card__icon-name">홍길동</span>
            </div>
            <HeartIcon id={nanoid()} />
          </div>
        </div>
        <Thumbnail src={data.src} type="book" />
        <div className="card__footer">
          <HeartIcon id={nanoid()} />
          <div className="card__icon-box">
            <img
              src="/img/svg/three-dot.svg"
              className="card__icon"
              alt="앱실론 이미지"
            />
          </div>
        </div>
      </div>
    </>
  );
}

Card.defaultProps = {
  title: '제목',
  src: '/img/test/thumbnail.png',
};

export default Card;
