import React from 'react';
import { FaviconProps } from './type';

function Favicon(data: FaviconProps) {
  return (
    <>
      {data.type === 'link' && (
        <img src={data.src} className="favicon" alt="" />
      )}
      {data.type === 'moaka' && (
        <img src="/img/svg/moaka.svg" alt="모아카 로고" className="favicon" />
      )}
    </>
  );
}

Favicon.defaultProps = {
  type: 'link',
  src: '/img/link-favicon.png',
};

export default Favicon;
