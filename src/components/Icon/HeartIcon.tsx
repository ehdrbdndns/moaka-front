import React from 'react';
import { onClickIcon } from './event';
import { HeartIconProps } from './type';

function HeartIcon(data: HeartIconProps) {
  return (
    <>
      <div
        className={'icon heart' + (data.isActive ? 'active' : '')}
        data-id={data.id}
      >
        {data.isActive ? (
          <img
            src="/img/svg/heart-active.svg"
            alt="아이콘"
            onClick={onClickIcon}
          />
        ) : (
          <img src="/img/svg/heart.svg" alt="아이콘" onClick={onClickIcon} />
        )}
        <span className="icon__value" id={data.id}>
          {data.value}
        </span>
      </div>
    </>
  );
}

HeartIcon.defaultProps = {
  value: '0',
  isActive: false,
};

export default HeartIcon;
