import React, { useRef } from 'react';
import { TagProps } from './types';

function Tag(data: TagProps) {
  const tagElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={'tag ' + data.type + ' ' + data.size}
        onClick={e => {
          data.onClick(e, data.value);
        }}
        ref={tagElem}
      >
        <span>{data.value}</span>
        {data.isCloseEvent && (
          <img
            className="tag__close"
            src="/img/svg/tag-close-btn.svg"
            alt="태그 삭제 이미지"
            onClick={() => data.onClickOfClose(data.value)}
          />
        )}
      </div>
    </>
  );
}

Tag.defaultProps = {
  type: '',
  value: '태그',
  size: 'm',
  onClick: () => {},
  isCloseEvent: false,
  onClickOfClose: () => {},
};

export default Tag;
