import React from 'react';
import { HeartIconProps } from './type';

function HeartIcon(data: HeartIconProps) {
  const { deleteLikeEvent, setLikeEvent, value } = data;
  return (
    <>
      <div className={'icon heart'}>
        {data.isActive ? (
          <img
            src="/img/svg/heart-active.svg"
            alt="아이콘"
            onClick={deleteLikeEvent}
          />
        ) : (
          <img src="/img/svg/heart.svg" alt="아이콘" onClick={setLikeEvent} />
        )}
        <span className="icon__value">{value}</span>
      </div>
    </>
  );
}

HeartIcon.defaultProps = {
  value: '0', // 좋아요 개수
  isActive: false, // 좋아요 체크 여부
  deleteLikeEvent: () => {},
  setLikeEvent: () => {},
};

export default HeartIcon;
