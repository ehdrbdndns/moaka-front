import React from 'react';
import { ThumbnailProps } from './type';

function Thumbnail(data: ThumbnailProps) {
  return (
    <>
      <figure className={'thumbnail thumbnail-' + data.type}>
        <img src={data.src} alt="thumbnail" />
      </figure>
    </>
  );
}

Thumbnail.defaultProps = {
  type: 'book_thumbnail', // link_thumbnail or book_thumbnail
  src: '/img/default-thumbnail.png',
};

export default Thumbnail;
