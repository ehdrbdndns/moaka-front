import { nanoid } from 'nanoid';
import React from 'react';
import HeartIcon from '../Icon/HeartIcon';
import LinkIcon from '../Icon/LinkIcon';
import Profile from '../Profile/Profile';
import Tag from '../Tag/Tag';
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
            <div className="card__icon-box">
              <LinkIcon />
            </div>
            <div className="card__icon-box">
              <HeartIcon id={nanoid()} />
            </div>
          </div>
        </div>
        <Thumbnail src={data.src} type="book" />
      </div>
      <div className="card-footer">
        <div className="card-footer__item">
          <Tag />
        </div>
        <div className="card-footer__item">
          <Tag />
        </div>
        <div className="card-footer__item">
          <Tag />
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
