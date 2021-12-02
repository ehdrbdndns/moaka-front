import React from 'react';
import { LinkIconProps } from './type';

function LinkIcon(data: LinkIconProps) {
  return (
    <>
      <div className={'icon link'}>
        <img src="/img/svg/link.svg" alt="아이콘" />
        <span className="icon__value">{data.value}</span>
      </div>
    </>
  );
}

LinkIcon.defaultProps = {
  value: 0,
};

export default LinkIcon;
