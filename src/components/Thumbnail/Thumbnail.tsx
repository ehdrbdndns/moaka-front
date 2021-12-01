import React from 'react';
import { ThumbnailProps } from './type';

function Thumbnail(data: ThumbnailProps) {
  return (
    <>
      <figure className={'thumbnail ' + data.type}>
        <img src={data.src} alt="thumbnail" />
      </figure>
    </>
  );
}

Thumbnail.defaultProps = {
  type: 'book',
  src: '/img/test/thumbnail.png',
};

export default Thumbnail;
