import React from 'react';

function NewArchiveCard() {
  return (
    <>
      <div className="card">
        <div className="card__header">
          <img
            src="/img/svg/bookmark.svg"
            className="card__bookmark"
            alt="북마크"
          />
          <h1 className="card__title">미술 입문자를 위한 아트 논문 모음집</h1>
          <div className="card__info">
            <div className="card__icon-box">
              <img
                src="/img/test/user-test.png"
                className="card__icon image-s"
                alt="사용자 이미지"
              />
              <span className="card_icon-name">홍길동</span>
            </div>
            <div className="card__icon-box">
              <img
                src="/img/svg/archive.svg"
                className="card__icon image-s"
                alt="아카이브 이미지"
              />
              <span className="card_icon-name">2</span>
            </div>
          </div>
        </div>
        <img
          src="/img/test/thumbnail.png"
          alt="썸네일"
          className="card__thumbnail"
        />
        <div className="card__footer">
          <div className="card__icon-box">
            <img
              src="/img/svg/heart.svg"
              className="card__icon"
              alt="하트 이미지"
            />
            <span className="card_icon-name">2</span>
          </div>
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

export default NewArchiveCard;
